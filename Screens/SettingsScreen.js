import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  Modal,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SettingsStyles } from "../Styles/SettingsStyles";
import { useLanguage } from "../localization/LanguageContext";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";

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
          <View style={SettingsStyles.languageDropdown}>
            {sortedLanguages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={SettingsStyles.languageOption}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <Text
                  style={[
                    SettingsStyles.languageOptionText,
                    lang.code === language &&
                      SettingsStyles.languageOptionTextSelected,
                  ]}
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
        <Text style={SettingsStyles.deleteDesc}>
          {strings.Settings.DeleteTMDbAccountDesc}
        </Text>
        <Modal visible={showWebView} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#18171c" }}>
            <View style={SettingsStyles.webViewHeader}>
              <TouchableOpacity
                style={SettingsStyles.webViewHeaderIcon}
                onPress={() =>
                  Linking.openURL(
                    "https://www.themoviedb.org/settings/delete-account",
                  )
                }
                accessibilityLabel={strings.Settings.OpenInBrowser}
                activeOpacity={0.7}
              >
                <Ionicons name="open-outline" size={24} color="#0af" />
              </TouchableOpacity>
              <Text
                style={SettingsStyles.webViewHeaderTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {strings.Settings.DeleteTMDbAccount}
              </Text>
              <TouchableOpacity
                style={SettingsStyles.webViewHeaderCloseBtn}
                onPress={() => setShowWebView(false)}
                activeOpacity={0.7}
              >
                <Text style={SettingsStyles.webViewHeaderClose}>
                  {strings.Settings.Close}
                </Text>
              </TouchableOpacity>
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
