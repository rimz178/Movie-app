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
  infoBox: {
    marginVertical: 8,
    backgroundColor: "#56555aff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  divider: {
    backgroundColor: "#444",
    height: 1,
    marginVertical: 8,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  centreText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },

  centres: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
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
    paddingHorizontal: 15,
  },
  bioGraphyText: {
    fontSize: 15,
    margin: 3,
    color: Colors.white,
    fontWeight: "200",
    marginTop: 10,
    paddingHorizontal: 15,
  },
});
