import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo"; // Lisää tämä import
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import MainStack from "./stack/MainStack";
/**
 * App component that initializes the application and renders the main navigation stack.
 *
 * @returns {JSX.Element} - The root component of the app.
 */
function App() {
  return <MainStack />;
}

export default registerRootComponent(App);

const styles = StyleSheet.create({});
