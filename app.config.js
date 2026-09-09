export default {
  name: "Movie-App",
  slug: "movie-app",
  version: "1.8.0",
  orientation: "default",
  icon: "./assets/movieicon.png",
  jsEngine: "hermes",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.edie17.MovieApp",
    jsEngine: "jsc",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      CFBundleLocalizations: ["en", "fi"],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/movieicon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.edie17.MovieApp",
    jsEngine: "hermes",
    predictiveBackGestureEnabled: false,
    permissions: ["android.permission.POST_NOTIFICATIONS"],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  owner: "edie17",
  extra: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN || "",
    // Real AdMob banner ad unit IDs (set these in .env before a production
    // build). Left empty, the app falls back to Google's test ad unit.
    ADMOB_BANNER_UNIT_ID_ANDROID:
      process.env.ADMOB_BANNER_UNIT_ID_ANDROID || "",
    ADMOB_BANNER_UNIT_ID_IOS: process.env.ADMOB_BANNER_UNIT_ID_IOS || "",
    eas: {
      projectId: "714a627c-2519-4b13-acaf-3dfc48f8158a",
    },
  },
  updates: {
    enabled: true,
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 5000,
  },
  runtimeVersion: "1.8.0",
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/movieicon.png",
        color: "#ffffff",
      },
    ],
    "expo-font",
    // NOTE: react-native-google-mobile-ads is pinned to 16.0.3 in
    // package.json (not the latest). 16.1.0+ pulls in Google's
    // play-services-ads 25.0.0+, which is compiled with a newer Kotlin
    // than Expo SDK 54's toolchain can currently build against
    // ("incompatible version of Kotlin" Gradle failure with no working
    // kotlinVersion override — Expo's KSP table tops out at 2.2.20,
    // still short of what 25.x needs). 16.0.3 uses play-services-ads
    // 24.9.0, which only requires Kotlin 2.1.0 — RN 0.81's default.
    [
      "react-native-google-mobile-ads",
      {
        // Google's public test App IDs — swap to the real AdMob App IDs
        // (via ADMOB_ANDROID_APP_ID / ADMOB_IOS_APP_ID in .env) before a
        // production build, otherwise no real ads will be requested.
        androidAppId:
          process.env.ADMOB_ANDROID_APP_ID ||
          "ca-app-pub-3940256099942544~3347511713",
        iosAppId:
          process.env.ADMOB_IOS_APP_ID ||
          "ca-app-pub-3940256099942544~1458002511",
      },
    ],
  ],
};
