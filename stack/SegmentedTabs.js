import React from "react";
import { View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { GlobalStyles } from "../Styles/GlobalStyles";

export default function SegmentedTabs({ selectedTab, onTabChange }) {
  return (
    <View style={GlobalStyles.segmentContainer}>
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
