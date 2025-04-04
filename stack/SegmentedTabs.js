import React from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

export default function SegmentedTabs({ selectedTab, onTabChange }) {
  return (
    <View style={styles.segmentContainer}>
      <SegmentedButtons
        value={selectedTab}
        onValueChange={onTabChange}
        buttons={[
          {
            value: "movies",
            label: "Movies",
            icon: "movie",
          },
          {
            value: "series",
            label: "Series",
            icon: "television-classic",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  segmentContainer: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
