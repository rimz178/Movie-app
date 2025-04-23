import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  content: {
    flex: 1,
    justifyContent: "space-between", // This will push logo to bottom
    padding: 20,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
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
});
