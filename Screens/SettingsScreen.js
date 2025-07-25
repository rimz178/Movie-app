import React, { useState } from "react";
import { TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SettingsStyles } from "../Styles/SettingsStyles";
import { useLanguage } from "../localization/LanguageContext";

/**
 * SettingsScreen component for managing user settings.
 *
 * @returns {JSX.Element} - The settings screen with a logout button and text.
 */
export default function SettingsScreen() {
  const navigation = useNavigation();
  const { language, setLanguage, strings } = useLanguage();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("session_id");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={SettingsStyles.container}>
      <View style={SettingsStyles.content}>
        {/* YLEISET */}

        {/* KIELI */}
        <Text style={SettingsStyles.sectionHeader}>
          {strings.Settings.Language}
        </Text>
        <TouchableOpacity
          style={SettingsStyles.row}
          onPress={() => setLanguageMenuOpen(!languageMenuOpen)}
        >
          <Text style={SettingsStyles.rowText}>
            {strings.Settings.ChangeLanguage}
          </Text>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {languageMenuOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
        {languageMenuOpen && (
          <View style={{ backgroundColor: "#232228", borderRadius: 8 }}>
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setLanguage("fi");
                setLanguageMenuOpen(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {strings.Settings.Finnish}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setLanguage("en");
                setLanguageMenuOpen(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {strings.Settings.English}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MUUT */}
        <Text style={SettingsStyles.sectionHeader}>
          {strings.Settings.OtherSettings}
        </Text>
        <View style={SettingsStyles.row}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleLogout}>
            <Text
              style={[
                SettingsStyles.rowText,
                { color: "#d00", textAlign: "center" },
              ]}
            >
              {strings.Settings.Logout}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
