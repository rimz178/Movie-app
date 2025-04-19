import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
const { width, height } = Dimensions.get("window");

export const SharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  content: {
    padding: 15,
    paddingHorizontal: 20,
  },

  images: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  insideImage: {
    width: width * 0.97,
    height: height * 0.48,
    borderRadius: 20,
  },
  titletext: {
    fontSize: 25,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  genre: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  descriptionText: {
    margin: 3,
    fontSize: 15,
    color: Colors.status,
    textAlign: "left",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.black,
    padding: 5,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginVertical: 10,
    textAlign: "center",
  },
});
