import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import Colors from "../Styles/Colors";
import { GlobalStyles } from "../Styles/GlobalStyles";
/**
 * Loading component that displays a loading spinner.
 *
 * @returns {JSX.Element} - The loading spinner.
 */
export default function Loading() {
  return (
    <View style={GlobalStyles.loadingContainer}>
      <Progress.CircleSnail thickness={12} size={160} color={Colors.white} />
    </View>
  );
}
