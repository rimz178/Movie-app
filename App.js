import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";

import MainStack from "./stack/MainStack";
import Colors from "./Colors/Colors";

export default function App() {
  return <MainStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});
