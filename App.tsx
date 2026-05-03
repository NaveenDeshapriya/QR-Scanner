import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { } from "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import Scan from "./src/Scan";
import Splash from "./src/Splash";

export type Params = {
  splash:undefined;
  scan: undefined;


}
export default function App() {

  const Stack = createNativeStackNavigator<Params>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen name="splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="scan" component={Scan} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );


}

