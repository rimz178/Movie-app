import { StyleSheet, Dimensions } from "react-native";
import Colors from "../Styles/Colors";

const { width } = Dimensions.get("window");

export const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  search: {
    backgroundColor: Colors.backcolor,
    marginHorizontal: 40,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.searchColor,
    width: "80%",
  },

  textinput: {
    fontSize: 20,
    padding: 10,
    marginLeft: 5,
    width: "90%",
    color: "white",
  },
  icon: {
    marginRight: 10,
    color: Colors.searchColor,
  },
  scorll: {
    flex: 1,
  },
  resultText: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 2,
    padding: 2,
  },
  otherText: {
    color: Colors.white,
  },
  image: {
    width: (width - 60) / 2,
    height: ((width - 60) / 2) * 1.5,
    margin: 2,
    marginLeft: 5,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
  },
  searchImage: {
    paddingHorizontal: 10,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.searchColor,
  },
  toggleBtnActive: {
    backgroundColor: Colors.buttonColor,
    borderColor: Colors.buttonColor,
  },
  toggleText: {
    color: Colors.status,
    fontSize: 13,
    fontWeight: "600",
  },
  toggleTextActive: {
    color: Colors.white,
  },
  chipsRow: {
    marginBottom: 12,
  },
  chipsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.searchColor,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.buttonColor,
    borderColor: Colors.buttonColor,
  },
  chipText: {
    color: Colors.status,
    fontSize: 13,
  },
  chipTextActive: {
    color: Colors.white,
    fontWeight: "600",
  },
});
