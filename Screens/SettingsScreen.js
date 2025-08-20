import React, { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SettingsStyles } from "../Styles/SettingsStyles";
import { useLanguage } from "../localization/LanguageContext";
import { WebView } from "react-native-webview";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { language, setLanguage, strings } = useLanguage();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    try {
      await AsyncStorage.setItem("app_language", lang);
      Alert.alert(
        strings.Settings.LanguageChanged,
        lang === "fi"
          ? strings.Settings.LanguageChangedMessage
          : strings.Settings.LanguageChangedMessageEn,
      );
    } catch (error) {
      console.error("Failed to set app language:", error);
    }
    setLanguageMenuOpen(false);
  };

  const languages = [
    { code: "fi", label: strings.Settings.Finnish },
    { code: "en", label: strings.Settings.English },
  ];
  const sortedLanguages = [
    languages.find((l) => l.code === language),
    ...languages.filter((l) => l.code !== language),
  ];

  return (
    <SafeAreaView style={SettingsStyles.container}>
      <View style={SettingsStyles.content}>
        {/* Kieli-asetukset */}
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
            {sortedLanguages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={{ padding: 12 }}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: lang.code === language ? "bold" : "normal",
                  }}
                >
                  {lang.label}
                  {lang.code === language ? " ✓" : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={SettingsStyles.sectionHeader}>
          {strings.Settings.OtherSettings}
        </Text>
        <View style={SettingsStyles.row}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={async () => {
              await AsyncStorage.removeItem("session_id");
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          >
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
        <Text style={SettingsStyles.sectionHeader}>
          {strings.Settings.AccountManagement || "Tilin hallinta"}
        </Text>
        <View style={SettingsStyles.row}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setShowWebView(true)}
          >
            <Text
              style={[
                SettingsStyles.rowText,
                {
                  color: "#d00",
                  textAlign: "center",
                  textDecorationLine: "underline",
                },
              ]}
            >
              {strings.Settings.DeleteTMDbAccount}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "#aaa",
            fontSize: 13,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {strings.Settings.DeleteTMDbAccountDesc}
        </Text>
        <Modal visible={showWebView} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#18171c" }}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "#18171c",
              }}
            >
              <TouchableOpacity onPress={() => setShowWebView(false)}>
                <Text style={{ color: "#d00", fontSize: 18 }}>Sulje</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginLeft: 20,
                }}
              >
                {strings.Settings.DeleteTMDbAccount}
              </Text>
            </View>
            <WebView
              source={{
                uri: "https://www.themoviedb.org/settings/delete-account",
              }}
              style={{ flex: 1 }}
              startInLoadingState
            />
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
