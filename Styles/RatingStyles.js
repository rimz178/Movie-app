import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const RatingStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    backgroundColor: "transparent",
  },
  ratingText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 5,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
});
