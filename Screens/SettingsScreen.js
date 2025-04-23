import React from "react";
import { TouchableOpacity, SafeAreaView, Text, View, Image, Linking } from "react-native";
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

  const handleTMDBLink = () => {
    Linking.openURL('https://www.themoviedb.org/');
  };

  return (
    <SafeAreaView style={SettingsStyles.container}>
      <View style={SettingsStyles.content}>
        <TouchableOpacity style={SettingsStyles.button} onPress={handleLogout}>
          <Text style={SettingsStyles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <View style={SettingsStyles.tmdbContainer}>
          <Text style={SettingsStyles.attribution}>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </Text>
          <TouchableOpacity onPress={handleTMDBLink}>
            <Image
              style={SettingsStyles.tmdbLogo}
              source={require('../assets/image/tmdb.jpg')} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
