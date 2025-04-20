import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
const { width, height } = Dimensions.get("window");

export const ListStyles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
    padding: 15,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    padding: 10,
  },
  image: {
    width: width * 0.33,
    height: height * 0.22,
    margin: 10,
    borderRadius: 10,
  },
});
