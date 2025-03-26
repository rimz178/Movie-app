import { View, Text, Dimension, StyleSheet } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import Colors from "../Colors/Colors";

/**
 * Loading component that displays a loading spinner.
 *
 * @returns {JSX.Element} - The loading spinner.
 */
export default function Loading() {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail thickness={12} size={160} color={Colors.white} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
