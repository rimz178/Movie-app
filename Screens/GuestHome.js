import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors/Colors";

/**
 * GuestHome component for non-logged-in users.
 *
 * @param {object} navigation - Navigation object for navigating between screens.
 * @returns {JSX.Element} - The guest home screen.
 */
export default function GuestHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Guest!</Text>
      <Text style={styles.subtitle}>
        Explore movies with limited features. Log in for full access.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainTabs", { isGuest: true })}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
