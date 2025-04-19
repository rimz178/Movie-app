import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backcolor,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
