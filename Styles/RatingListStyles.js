import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const RatingListStyles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    padding: 15,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 120,
    marginHorizontal: 5,
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
  },
  poster: {
    width: "100%",
    height: 180,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
});
