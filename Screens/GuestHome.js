import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLanguage } from "../localication/LanguageContext";
import { GuestHomeStyles } from "../Styles/GuestHomeStyles";
/**
 * GuestHome component for non-logged-in users.
 *
 * @param {object} navigation - Navigation object for navigating between screens.
 * @returns {JSX.Element} - The guest home screen.
 */
export default function GuestHome({ navigation }) {
  const { strings } = useLanguage();
  return (
    <View style={GuestHomeStyles.container}>
      <Text style={GuestHomeStyles.title}>
        {strings.GuestHome.WelcomeGuest}
      </Text>
      <Text style={GuestHomeStyles.subtitle}>
        {strings.GuestHome.FullAcces}
      </Text>

      <TouchableOpacity
        style={GuestHomeStyles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={GuestHomeStyles.buttonText}>{strings.Auth.Login}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GuestHomeStyles.button}
        onPress={() => navigation.navigate("MainTabs", { isGuest: true })}
      >
        <Text style={GuestHomeStyles.buttonText}>{strings.GuestHome.GoTo}</Text>
      </TouchableOpacity>
    </View>
  );
}
