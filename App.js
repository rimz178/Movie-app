import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { useEffect } from "react";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

enableScreens();

import MainStack from "./stack/MainStack";
import { LanguageProvider } from "./localization/LanguageContext";
/**
 * App component that initializes the application and renders the main navigation stack.
 *
 * @returns {JSX.Element} - The root component of the app.
 */
function App() {
  useEffect(() => {
    const checkAndAskForReview = async () => {
      try {
        const LAUNCH_COUNT_KEY = "app_launch_count";
        const REVIEW_SHOWN_KEY = "review_shown";
        let count = Number.parseInt(
          (await AsyncStorage.getItem(LAUNCH_COUNT_KEY)) || "0",
          10,
        );
        const reviewShown = await AsyncStorage.getItem(REVIEW_SHOWN_KEY);

        if (!reviewShown) {
          count += 1;
          await AsyncStorage.setItem(LAUNCH_COUNT_KEY, count.toString());

          if (count === 5 && (await StoreReview.isAvailableAsync())) {
            StoreReview.requestReview();
            await AsyncStorage.setItem(REVIEW_SHOWN_KEY, "true");
          }
        }
      } catch (e) {}
    };
    checkAndAskForReview();
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <MainStack />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({});
