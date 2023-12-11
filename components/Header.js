import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../Colors/Colors";

const openMenu = () => {
  //Koodan tähän myöhemmin
};
//Header icon
const Header = (props) => {
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    backgroundColor: Colors.backcolor,
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 23,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    right: 16,
    color: Colors.white,
  },
});

export default Header;
