import { Platform } from "react-native";
import Constants from "expo-constants";
import { TestIds } from "react-native-google-mobile-ads";

const readExtra = (key) =>
  Constants.expoConfig?.extra?.[key] ||
  Constants.manifest?.extra?.[key] ||
  "";

/**
 * Returns the banner ad unit ID to use for the current platform.
 * Falls back to Google's public test ad unit if no real ID is configured
 * (via ADMOB_BANNER_UNIT_ID_ANDROID / ADMOB_BANNER_UNIT_ID_IOS in .env),
 * or always in dev builds so real ads are never accidentally requested
 * — and clicked — during development.
 */
export const getBannerAdUnitId = () => {
  if (__DEV__) return TestIds.BANNER;

  const configured = readExtra(
    Platform.OS === "ios"
      ? "ADMOB_BANNER_UNIT_ID_IOS"
      : "ADMOB_BANNER_UNIT_ID_ANDROID",
  ).trim();

  return configured || TestIds.BANNER;
};
