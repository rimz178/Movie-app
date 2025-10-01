import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18171c", // tumma tausta
  },
  content: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: "#d00",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tmdbContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  attribution: {
    color: Colors.white,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
  },
  tmdbLogo: {
    width: 200,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 10,
  },
  sectionHeader: {
    backgroundColor: "#18171c",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232228",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    marginBottom: 0,
    borderRadius: 8,
    minHeight: 48,
  },
  rowText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  actionButton: {
    backgroundColor: "#d00",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  languageDropdown: {
    backgroundColor: "#232228",
    borderRadius: 8,
  },
  languageOption: {
    padding: 12,
  },
  languageOptionText: {
    color: "#fff",
    fontSize: 16,
  },
  languageOptionTextSelected: {
    fontWeight: "bold",
  },
  deleteDesc: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
  webViewHeader: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#18171c",
    alignItems: "center",
  },
  webViewHeaderClose: {
    color: "#d00",
    fontSize: 18,
  },
  webViewHeaderTitle: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  webViewHeaderIcon: {
    width: 40,
    alignItems: "flex-end",
  },
  webViewHeaderCloseBtn: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
