import { StyleSheet } from "react-native";
import Colors from "../Styles/Colors";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    padding: 15,
  },
  errorText: {
    color: Colors.red,
    fontSize: 16,
    fontWeight: "bold",
  },
  guestText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  segmentContainer: {
    padding: 10,
    backgroundColor: Colors.segmentedBackground,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  recommendationTeaserWrap: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 6,
  },
  recommendationTeaserCard: {
    backgroundColor: "#1F1F1F",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#353535",
  },
  recommendationTeaserEyebrow: {
    color: Colors.buttonColor,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  recommendationTeaserTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  recommendationTeaserText: {
    color: Colors.status,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationTeaserButton: {
    alignSelf: "flex-start",
    backgroundColor: Colors.buttonColor,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  recommendationTeaserButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
