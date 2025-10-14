import { Alert } from "react-native";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Check updat  es and prompt user to update if available
 */
export const checkForUpdates = async () => {
  try {

    const language = (await AsyncStorage.getItem("app_language")) || "fi";

   
    if (!__DEV__) {
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
    }
  } catch (error) {
    console.error("Error checking for updates:", error);

  }
};

/**
 * 
 * @param {number} delay - Viive millisekunneissa (oletus: 2000ms)
 */
export const startUpdateCheck = (delay = 2000) => {
  const timer = setTimeout(() => {
    checkForUpdates();
  }, delay);

  return timer; 
};
