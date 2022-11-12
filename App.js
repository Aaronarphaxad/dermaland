import "./firebase";
import "react-native-url-polyfill/auto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RootNavigation from "./navigation";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppings-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppings-Black": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppings-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppings-ExtraBold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  });
  return <RootNavigation />;
}
