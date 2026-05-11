import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Styles/Colors";

const { width } = Dimensions.get("window");

export const RecommendationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: "#1F1F1F",
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#353535",
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroText: {
    color: Colors.status,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: Colors.searchColor,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionButtonActive: {
    backgroundColor: Colors.buttonColor,
    borderColor: Colors.buttonColor,
  },
  optionText: {
    color: Colors.status,
    fontSize: 14,
    fontWeight: "600",
  },
  optionTextActive: {
    color: Colors.white,
  },
  chipsRow: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  chipsContent: {
    paddingRight: 16,
  },
  generateButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  generateButtonDisabled: {
    opacity: 0.65,
  },
  generateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  resultCard: {
    backgroundColor: "#181818",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#313131",
  },
  poster: {
    width: "100%",
    height: width * 1.2,
    backgroundColor: "#262626",
  },
  resultBody: {
    padding: 16,
  },
  resultMeta: {
    color: Colors.buttonColor,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  resultTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  resultInfo: {
    color: Colors.status,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  resultOverview: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: Colors.buttonColor,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3B3B3B",
  },
  primaryActionText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 14,
  },
  secondaryActionText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 14,
  },
  emptyCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#313131",
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyText: {
    color: Colors.status,
    fontSize: 14,
    lineHeight: 20,
  },
});
