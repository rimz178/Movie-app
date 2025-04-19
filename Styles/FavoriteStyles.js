import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.33;

export const FavoriteStyles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    padding: 15,
  },
  movieCard: {
    width: ITEM_WIDTH,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: Colors.darkGray,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: "100%",
    height: height * 0.22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.white,
  },
});
