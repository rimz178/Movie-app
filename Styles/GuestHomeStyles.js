import { StyleSheet } from "react-native";
import Colors from "./Colors";
export const GuestHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.backcolor,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.loginButton,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
