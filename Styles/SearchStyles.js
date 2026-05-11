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
  genreSection: {
    marginTop: -4,
    marginBottom: 10,
  },
  recommendationCard: {
    marginHorizontal: 16,
    marginTop: -22,
    marginBottom: 14,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#1F1F1F",
    borderWidth: 1,
    borderColor: "#353535",
  },
  recommendationEyebrow: {
    color: Colors.buttonColor,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  recommendationTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  recommendationText: {
    color: Colors.status,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationButton: {
    alignSelf: "flex-start",
    backgroundColor: Colors.buttonColor,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  recommendationButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  genreHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  genreTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  genreSubtitle: {
    color: Colors.status,
    fontSize: 13,
  },
  genreHeaderIcon: {
    color: Colors.status,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.searchColor,
    backgroundColor: "#2A2A2A",
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
    paddingRight: 24,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.searchColor,
    marginRight: 8,
    backgroundColor: "#2A2A2A",
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
