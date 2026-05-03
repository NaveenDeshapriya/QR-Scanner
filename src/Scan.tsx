import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, BackHandler, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Params } from "../App";
import { useNavigation } from "@react-navigation/native";
export default function Scan() {

    type RootProp = NativeStackNavigationProp<Params, "scan">;
    const navigation = useNavigation<RootProp>();
    const permission = async () => {
        const getPermission = await Camera.requestCameraPermissionsAsync();
        getPermission.status === "granted" ? console.log("Camera permission granted") : console.log("Camera permission denied");
    }
    const [result, setResult] = useState<string | null>(null);
    const [zoom, setZoom] = useState(0);

    const closeApp = () => {
        Alert.alert("Exit App", "Do you want exit app!", [
            {
                text: "Cancel",
                style: 'cancel',
            },
            {
                text: "Yes",
                onPress: () => BackHandler.exitApp(),
            }
        ]);
    }

    useEffect(() => {
        permission();
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            closeApp();
        });
    }, []);


    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 bg-black">
                <View className="absolute top-12 w-full  justify-between px-6">

                    <Text className="text-white text-2xl font-semibold">Scan QR</Text>

                    <TouchableOpacity className="top-3 flex-row gap-2 mb-5" onPress={() => setZoom(1)}>
                        <Image source={zoom === 1 ? require("../assets/zoomIn-green.png") : require("../assets/zoomin-white.png")} style={{ width: 22, height: 22 }} />

                        <Text className={` ${zoom === 1 ? `text-green-400` : `text-white`}`} >Zoom In</Text>

                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-2" onPress={() => setZoom(0)}>

                        <Text className={zoom === 0 ? `text-green-400` : `text-white`} >Zoom out</Text>
                        <Image source={zoom === 0 ? require("../assets/zoomout-green.png") : require("../assets/zoomout-white.png")} style={{ width: 22, height: 22 }} />

                    </TouchableOpacity>

                </View>

                {/* Scanner Frame */}
                <View className="flex-1 justify-center items-center">
                    <View className="w-64 h-64 border-2 border-green-400 rounded-xl">

                        <CameraView zoom={zoom} facing="back" style={{ width: "100%", height: "100%", borderRadius: 8 }} onBarcodeScanned={(res) => {

                            if (res) {
                                res.data ? setResult(res.data) : null;

                                Linking.openURL(res.data);
                                res.bounds;

                            }


                        }} />


                    </View>
                    <Text className="text-white mt-4">
                        Place QR code inside the frame
                    </Text>



                </View>

                {/* Bottom Result */}
                {result ? (
                    <View className="absolute bottom-10 left-5 right-5 bg-white/10 p-4 rounded-xl">
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(result);
                        }} >
                            <Text className="text-white mb-auto p-3 underline">{result}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setResult(null);
                            }}
                            className="bg-green-400 py-2 rounded-lg"
                        >
                            <Text className="text-center font-bold text-black">
                                Scan Again
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </SafeAreaView>

    );
}