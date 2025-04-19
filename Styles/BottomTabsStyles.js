import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const BottomTabsStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.backcolor,
    borderTopWidth: 0,
    height: 65,
    paddingBottom: 20,
    elevation: 0,
    borderTopColor: "transparent",
  },
  header: {
    backgroundColor: Colors.backcolor,
  },
});