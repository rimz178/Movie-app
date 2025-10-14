export default {
  name: "Movie-App",
  slug: "movie-app",
  version: "1.4.0",
  orientation: "portrait",
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
    eas: {
      projectId: "714a627c-2519-4b13-acaf-3dfc48f8158a",
    },
  },
  updates: {
    enabled: true,
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 5000,
  },
  runtimeVersion: "1.4.0",
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/movieicon.png",
        color: "#ffffff",
      },
    ],
  ],
};
