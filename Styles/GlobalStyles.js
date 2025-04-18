import { StyleSheet } from "react-native";
import Colors from "../Styles/Colors";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,  
    paddingBottom: 60
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
});