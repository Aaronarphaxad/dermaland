import "./firebase";
import "react-native-url-polyfill/auto";
import RootNavigation from "./navigation";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppings-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppings-Black": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppings-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RootNavigation />;
}
