import { Alert } from "react-native";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkForUpdates = async () => {
  try {
    const language = (await AsyncStorage.getItem("app_language")) || "fi";

    if (__DEV__) {
      // TESTAA AINA kehitystilassa
      const lastCheckVersion = await AsyncStorage.getItem("last_check_version");
      const currentVersion = "1.4.0"; // MUUTA TÄMÄ testaamista varten (oli 1.3.0)

      console.log(
        `Last version: ${lastCheckVersion}, Current: ${currentVersion}`,
      );

      if (lastCheckVersion !== currentVersion) {
        Alert.alert(
          language === "fi" ? "🔄 Sovellus päivitetty!" : "🔄 App Updated!",
          language === "fi"
            ? `Versio ${currentVersion} - Uusia ominaisuuksia saatavilla!`
            : `Version ${currentVersion} - New features available!`,
          [
            {
              text: language === "fi" ? "Selvä!" : "Got it!",
              onPress: async () => {
                await AsyncStorage.setItem(
                  "last_check_version",
                  currentVersion,
                );
                console.log("Version saved:", currentVersion);
              },
            },
            {
              text: language === "fi" ? "Nollaa testi" : "Reset test",
              style: "destructive",
              onPress: async () => {
                await AsyncStorage.removeItem("last_check_version");
                console.log("Test reset - will show again next time");
              },
            },
          ],
        );
        return;
      }

      console.log("No version change detected");
      return;
    }

    // Tuotantokoodia...
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      Alert.alert(
        language === "fi" ? "📱 Päivitys saatavilla" : "📱 Update Available",
        language === "fi"
          ? "Uusi versio sovelluksesta on saatavilla. Haluatko päivittää nyt?"
          : "A new version of the app is available. Would you like to update now?",
        [
          {
            text: language === "fi" ? "Myöhemmin" : "Later",
            style: "cancel",
          },
          {
            text: language === "fi" ? "Päivitä" : "Update",
            onPress: async () => {
              try {
                Alert.alert(
                  language === "fi" ? "⏳ Päivitetään..." : "⏳ Updating...",
                  language === "fi"
                    ? "Sovellus päivitetään. Älä sulje sovellusta."
                    : "The app is updating. Please don't close the app.",
                );

                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              } catch (error) {
                console.error("Update failed:", error);
                Alert.alert(
                  language === "fi"
                    ? "❌ Päivitys epäonnistui"
                    : "❌ Update Failed",
                  language === "fi"
                    ? "Päivitys epäonnistui. Yritä myöhemmin uudelleen."
                    : "Update failed. Please try again later.",
                );
              }
            },
          },
        ],
      );
    }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
};

export const startUpdateCheck = (delay = 2000) => {
  const timer = setTimeout(() => {
    checkForUpdates();
  }, delay);

  return timer;
};
