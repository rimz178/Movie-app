export default {
  expo: {
    name: "Movie-App",
    slug: "movie-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    jsEngine: "hermes",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.edie17.MovieApp",
      jsEngine: "jsc",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.edie17.MovieApp"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    owner: "edie17",
    extra: {
      TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
      eas: {
        projectId: "714a627c-2519-4b13-acaf-3dfc48f8158a"
      }
    },
    updates: {
      enabled: false,
      checkAutomatically: "ON_ERROR_RECOVERY",
      fallbackToCacheTimeout: 0
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
  }
};