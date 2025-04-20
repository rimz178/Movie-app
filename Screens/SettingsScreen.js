import React from "react";
import { TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SettingsStyles } from "../Styles/SettingsStyles";

/**
 * SettingsScreen component for managing user settings.
 *
 * @returns {JSX.Element} - The settings screen with a logout button and text.
 */
export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("session_id");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={SettingsStyles.container}>
      <View style={SettingsStyles.row}>
        <TouchableOpacity style={SettingsStyles.button} onPress={handleLogout}>
          <Text style={SettingsStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
