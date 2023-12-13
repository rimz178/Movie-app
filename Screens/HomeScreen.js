import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../Colors/Colors";

function HomeScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backcolor,
  },
  text: {
    color: Colors.white,
    fontSize: 23,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
  },
});

export default HomeScreen;