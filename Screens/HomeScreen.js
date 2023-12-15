import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../Colors/Colors";
import ImageCollase from "../components/ImageCollase";
import SearchBar from "../components/SearchBars";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View>
        <ImageCollase />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});

export default HomeScreen;
