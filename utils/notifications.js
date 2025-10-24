import { Platform, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LANGUAGE_CODES from "../localization/languageCodes";
import { fetchUpcoming, fetchTrendingSeries } from "../Api/ApiParsing";

import fiStrings from "../localization/fi.json";
import enStrings from "../localization/en.json";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      const language = (await AsyncStorage.getItem("app_language")) || "fi";
      const errorMsg =
        language === "fi"
          ? "Salli ilmoitukset sovelluksen asetuksista käyttääksesi tätä toimintoa."
          : "Allow notifications in app settings to use this feature.";

      Alert.alert("❌", errorMsg);
      return null;
    }

    try {
      if (Platform.OS === "ios") {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        return token;
      } else {
        await Notifications.getExpoPushTokenAsync();
        return true;
      }
    } catch (error) {
      console.error("Error getting push token:", error);
      return Platform.OS === "ios" ? null : true;
    }
  } else {
    Alert.alert("ℹ️", "Push notifications require a physical device");
    return null;
  }
}

export async function scheduleUpcomingMovieNotifications() {
  try {
    const language = (await AsyncStorage.getItem("app_language")) || "fi";
    const upcomingData = await fetchUpcoming(LANGUAGE_CODES[language]);
    const movies = upcomingData?.results || [];
    const strings = await getStrings();

    if (!strings?.Notifications) {
      console.warn(
        "Missing Notifications translations for scheduleUpcomingMovieNotifications",
      );
      return;
    }

    const titleSoon = strings.Notifications.MovieSoon;
    const bodySoon = strings.Notifications.TimeSoon;
    const titleNow = strings.Notifications.MovieNow;
    const bodyNow = strings.Notifications.TimeNow;

    for (const movie of movies.slice(0, 5)) {
      const releaseDate = new Date(movie.release_date);
      const notify24h = new Date(releaseDate.getTime() - 24 * 60 * 60 * 1000);
      const releaseNotify = releaseDate;

      if (notify24h > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: titleSoon,
            body: `"${movie.title}" ${bodySoon}`,
            data: {
              movieId: movie.id,
              type: "movie",
              when: "soon",
              title: movie.title,
            },
            sound: "default",
          },
          trigger: { type: "date", date: notify24h },
        });
      }

      if (releaseNotify > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: titleNow,
            body: `"${movie.title}" ${bodyNow}`,
            data: {
              movieId: movie.id,
              type: "movie",
              when: "now",
              title: movie.title,
            },
            sound: "default",
          },
          trigger: { type: "date", date: releaseNotify },
        });
      }
    }
  } catch (error) {
    console.error("Error scheduling movie notifications:", error);
  }
}

export async function scheduleUpcomingSeriesNotifications() {
  try {
    const language = (await AsyncStorage.getItem("app_language")) || "fi";
    const seriesData = await fetchTrendingSeries(LANGUAGE_CODES[language]);
    const series = seriesData?.results || [];
    const strings = await getStrings();

    if (!strings?.Notifications) {
      console.warn(
        "Missing Notifications translations for scheduleUpcomingSeriesNotifications",
      );
      return;
    }

    const titleSoon = strings.Notifications.SeriesSoon;
    const bodySoon = strings.Notifications.TimeSoon;
    const titleNow = strings.Notifications.SeriesNow;
    const bodyNow = strings.Notifications.TimeNow;

    for (const show of series.slice(0, 5)) {
      if (!show.first_air_date) continue;
      const airDate = new Date(show.first_air_date);
      const notify24h = new Date(airDate.getTime() - 24 * 60 * 60 * 1000);
      const releaseNotify = airDate;

      if (notify24h > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: titleSoon,
            body: `"${show.name}" ${bodySoon}`,
            data: {
              seriesId: show.id,
              type: "series",
              when: "soon",
              title: show.name,
            },
            sound: "default",
          },
          trigger: { type: "date", date: notify24h },
        });
      }

      if (releaseNotify > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: titleNow,
            body: `"${show.name}" ${bodyNow}`,
            data: {
              seriesId: show.id,
              type: "series",
              when: "now",
              title: show.name,
            },
            sound: "default",
          },
          trigger: { type: "date", date: releaseNotify },
        });
      }
    }
  } catch (error) {
    console.error("Error scheduling series notifications:", error);
  }
}

export async function scheduleAllUpcomingNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await scheduleUpcomingMovieNotifications();
    await scheduleUpcomingSeriesNotifications();
  } catch (error) {
    console.error("Error scheduling all notifications:", error);
  }
}
