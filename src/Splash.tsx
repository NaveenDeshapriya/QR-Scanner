import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Params } from "../App";

export default function Splash() {

    type RootProp = NativeStackNavigationProp<Params, "splash">;

    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<RootProp>();


    const animationSplash = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start((finish) => {
            if (finish.finished) {
                navigation.navigate("scan");
            }

        });
    }

    useEffect(() => {
        animationSplash();
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-black">

            <Text className="text-green-400 text-4xl font-semibold mb-1">WelCome</Text>
            <Animated.Text className="text-green-400 text-xl" style={{ opacity: fadeAnimation }}>QR-Scanner</Animated.Text>

            <Text className="text-slate-300 absolute bottom-0 mb-8 text-sm">Develop by Penguin</Text>

        </View>
    );
}