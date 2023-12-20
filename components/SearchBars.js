import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../Colors/Colors";

export default function SearchBars() {
  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={20}
        color="white"
        style={{ marginLeft: 3 }}
      />
      <TextInput style={styles.textinput} placeholder="Search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.searchColor,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    width: "80%",
  },

  textinput: {
    fontSize: 20,
    padding: 10,
    marginLeft: 5,
    width: "90%",
    color: "white",
  },
});
