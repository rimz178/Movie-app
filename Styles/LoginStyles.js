import { StyleSheet } from "react-native";
import Colors from "./Colors";

 export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.backcolor,
  },
  title: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: "bold",
    marginBottom: 30,
  },
  login: {
    fontSize: 24,
    marginBottom: 20,
    color: Colors.white,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#f0f0f0",
    color: "#333333",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.loginButton,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "white",
    marginTop: 10,
  },
});