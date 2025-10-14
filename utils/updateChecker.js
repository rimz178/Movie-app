import { Alert } from "react-native";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fiStrings from "../localization/fi.json";
import enStrings from "../localization/en.json";

/**
 * Get strings based on current language
 */
const getStrings = async () => {
  try {
    const language = await AsyncStorage.getItem("app_language");
    const lang = language || "fi";
    return lang === "en" ? enStrings : fiStrings;
  } catch (error) {
    console.error("Error getting language:", error);
    return fiStrings;
  }
};

/**
 * Check updates and prompt user to update if available
 */
export const checkForUpdates = async () => {
  try {
    const strings = await getStrings();

    if (!__DEV__) {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        Alert.alert(
          strings.Updates.UpdateAvailable,
          strings.Updates.UpdateMessage,
          [
            {
              text: strings.Updates.Later,
              style: "cancel",
            },
            {
              text: strings.Updates.Update,
              onPress: async () => {
                try {
                  Alert.alert(
                    strings.Updates.Updating,
                    strings.Updates.UpdatingMessage,
                  );

                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                } catch (error) {
                  console.error("Update failed:", error);
                  Alert.alert(
                    strings.Updates.UpdateFailed,
                    strings.Updates.UpdateFailedMessage,
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
 * Start update check with delay
 * @param {number} delay - Delay in milliseconds (default: 2000ms)
 */
export const startUpdateCheck = (delay = 2000) => {
  const timer = setTimeout(() => {
    checkForUpdates();
  }, delay);

  return timer;
};
