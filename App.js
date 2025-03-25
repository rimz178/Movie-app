import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo"; // Lisää tämä import
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import MainStack from "./stack/MainStack";

function App() {
  return <MainStack />;
}

export default registerRootComponent(App);

const styles = StyleSheet.create({});
