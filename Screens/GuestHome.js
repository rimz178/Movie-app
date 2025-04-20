import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { GuestHomeStyles } from "../Styles/GuestHomeStyles";
/**
 * GuestHome component for non-logged-in users.
 *
 * @param {object} navigation - Navigation object for navigating between screens.
 * @returns {JSX.Element} - The guest home screen.
 */
export default function GuestHome({ navigation }) {
  return (
    <View style={GuestHomeStyles.container}>
      <Text style={GuestHomeStyles.title}>Welcome, Guest!</Text>
      <Text style={GuestHomeStyles.subtitle}>
        Explore movies with limited features. Log in for full access.
      </Text>

      <TouchableOpacity
        style={GuestHomeStyles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={GuestHomeStyles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GuestHomeStyles.button}
        onPress={() => navigation.navigate("MainTabs", { isGuest: true })}
      >
        <Text style={GuestHomeStyles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
