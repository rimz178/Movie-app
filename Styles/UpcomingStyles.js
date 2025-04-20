import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
const { width, height } = Dimensions.get("window");

export const UpcomingStyles = StyleSheet.create({
  itemImg: {
    margin: 5,
    padding: 5,
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
    padding: 20,
  },
});
