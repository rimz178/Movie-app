import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const { width } = Dimensions.get("window");

export const WatchProviderStyles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  items: {
    marginStart: -10,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    color: Colors.white,
    fontSize: 12,
  },
  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    width: width * 0.14,
    height: width * 0.14,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
