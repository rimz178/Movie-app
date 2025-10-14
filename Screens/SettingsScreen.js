import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  Modal,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { SettingsStyles } from "../Styles/SettingsStyles";
import { useLanguage } from "../localization/LanguageContext";
import { WebView } from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  scheduleUpcomingMovieNotifications,
  scheduleUpcomingSeriesNotifications,
  registerForPushNotificationsAsync,
} from "../utils/notifications";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { language, setLanguage, strings } = useLanguage();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [movieNotificationsEnabled, setMovieNotificationsEnabled] =
    useState(false);
  const [seriesNotificationsEnabled, setSeriesNotificationsEnabled] =
    useState(false);

  useEffect(() => {
    const checkNotificationStatus = async () => {
      try {
        const movieEnabled = await AsyncStorage.getItem(
          "movie_notifications_enabled",
        );
        const seriesEnabled = await AsyncStorage.getItem(
          "series_notifications_enabled",
        );
        setMovieNotificationsEnabled(movieEnabled === "true");
        setSeriesNotificationsEnabled(seriesEnabled === "true");
      } catch (error) {
        console.error("Error checking notification status:", error);
      }
    };
    checkNotificationStatus();
  }, []);

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
  const handleMovieNotificationToggle = async () => {
    if (!movieNotificationsEnabled) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await scheduleUpcomingMovieNotifications();
        await AsyncStorage.setItem("movie_notifications_enabled", "true");
        setMovieNotificationsEnabled(true);
        Alert.alert(
          strings.Settings.NotificationsEnabled,
          strings.Settings.NotificationsEnabledMessage,
        );
      }
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      if (seriesNotificationsEnabled) {
        await scheduleUpcomingSeriesNotifications();
      }
      await AsyncStorage.setItem("movie_notifications_enabled", "false");
      setMovieNotificationsEnabled(false);
      Alert.alert(strings.Settings.NotificationsDisabled);
    }
  };

  const handleSeriesNotificationToggle = async () => {
    if (!seriesNotificationsEnabled) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await scheduleUpcomingSeriesNotifications();
        await AsyncStorage.setItem("series_notifications_enabled", "true");
        setSeriesNotificationsEnabled(true);
        Alert.alert(
          strings.Settings.NotificationsEnabled,
          strings.Settings.NotificationsEnabledMessageTv,
        );
      }
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      if (movieNotificationsEnabled) {
        await scheduleUpcomingMovieNotifications();
      }
      await AsyncStorage.setItem("series_notifications_enabled", "false");
      setSeriesNotificationsEnabled(false);
      Alert.alert(strings.Settings.NotificationsDisabled);
    }
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
    <SafeAreaProvider style={SettingsStyles.container}>
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
          {strings.Settings.Notifications}
        </Text>

        <TouchableOpacity
          style={SettingsStyles.row}
          onPress={handleMovieNotificationToggle}
        >
          <Text style={SettingsStyles.rowText}>
            🎬 {strings.Movies.UpcomingMovies}
          </Text>
          <Text
            style={{
              color: movieNotificationsEnabled ? "#00ff00" : "#fff",
              fontSize: 16,
            }}
          >
            {movieNotificationsEnabled ? "✓" : "○"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={SettingsStyles.row}
          onPress={handleSeriesNotificationToggle}
        >
          <Text style={SettingsStyles.rowText}>
            📺{" "}
            {strings.Series?.TrendingSeries
              ? strings.Series.TrendingSeries
              : "Trending Series"}
          </Text>
          <Text
            style={{
              color: seriesNotificationsEnabled ? "#00ff00" : "#fff",
              fontSize: 16,
            }}
          >
            {seriesNotificationsEnabled ? "✓" : "○"}
          </Text>
        </TouchableOpacity>

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
          <SafeAreaProvider style={{ flex: 1, backgroundColor: "#18171c" }}>
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
                <MaterialIcons name="open-in-browser" size={24} color="#fff" />
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
          </SafeAreaProvider>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}
