import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import Colors from "./Colors/Colors";

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Movie App" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});
