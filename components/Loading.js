import { View, ActivityIndicator } from "react-native";
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
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
}
