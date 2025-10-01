import { StyleSheet, Platform } from "react-native";
import Colors from "./Colors";

export const BottomTabsStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.backcolor,
    borderTopWidth: 0,
    height: Platform.OS === "android" ? 100 : 65,
    paddingBottom: Platform.OS === "android" ? 30 : 20,
    elevation: 0,
    borderTopColor: "transparent",
  },
  header: {
    backgroundColor: Colors.backcolor,
  },
});
