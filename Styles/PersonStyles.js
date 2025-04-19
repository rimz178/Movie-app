import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
const { width, height } = Dimensions.get("window");

export const PersonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.backcolor,
  },
  person: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },

  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (height * 0.3) / 2,
    overflow: "hidden",
  },

  image: {
    height: height * 0.3,
    width: width * 0.63,
    resizeMode: "cover",
    borderRadius: (height * 0.3) / 2,
  },
  titleContainer: {
    alignItems: "center",
    padding: 10,
  },

  title: {
    fontSize: 25,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  cenderContainer: {
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: Colors.searchColor,
    borderRadius: 25,
    padding: 20,
  },

  divider: {
    height: "100%",
    width: 1,
    marginRight: 10,
  },
  textContainer: {
    marginRight: 5,
  },
  cendreText: {
    marginRight: 10,
    marginStart: 5,
    fontSize: 15,
    textAlign: "justify",
    color: Colors.white,
    fontWeight: "600",
  },

  cendres: {
    marginStart: 5,
    fontSize: 13,
    color: Colors.status,
  },
  bioGraphyContainter: {
    flexDirection: "column",
    fontWeight: "600",
    marginStart: 5,
    marginTop: 30,
  },
  bioGraphyTitle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
  },
  bioGraphyText: {
    fontSize: 15,
    margin: 3,
    color: Colors.white,
    fontWeight: "200",
    marginTop: 10,
  },
});
