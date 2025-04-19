import { StyleSheet, Dimensions } from "react-native";
import Colors from "../Styles/Colors";

const { width, height } = Dimensions.get("window");

export const CastStyles = StyleSheet.create({
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
    fontSize: 15,
  },
  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (height * 0.3) / 2,
    overflow: "hidden",
  },
  image: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "cover",
    borderRadius: (height * 0.3) / 2,
    padding: 5,
    margin: 2,
  },
});
