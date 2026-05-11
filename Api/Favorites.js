import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { logger } from "../utils/logger";
import LANGUAGE_CODES from "../localization/languageCodes";
import { getTmdbBearerToken } from "../utils/tmdbToken";

const API_TOKEN = getTmdbBearerToken();
const BASE_URL = "https://api.themoviedb.org/3";
const SESSION_EXPIRED_MESSAGE = "Session expired. Please log in again.";

const getLanguageCode = async (language) => {
  const lang = language || (await AsyncStorage.getItem("app_language")) || "en";
  return LANGUAGE_CODES[lang] || LANGUAGE_CODES.en;
};

const isTmdbAuthError = (payload) => {
  const statusCode = payload?.status_code;
  const statusMessage = payload?.status_message || "";
  return (
    statusCode === 3 ||
    /authentication failed|do not have permissions/i.test(statusMessage)
  );
};

const throwIfAuthFailed = async (payload) => {
  if (!isTmdbAuthError(payload)) return;
  await AsyncStorage.removeItem("session_id");
  throw new Error(SESSION_EXPIRED_MESSAGE);
};

/**
 * Helper function to get the session ID from AsyncStorage.
 */
async function getSessionId() {
  const sessionId = await AsyncStorage.getItem("session_id");
  if (!sessionId) {
    throw new Error("User is not logged in.");
  }
  return sessionId;
}

/**
 * Toggles a media item as a favorite on TMDb.
 */
export async function toggleFavorite(mediaId, favorite, mediaType = "movie") {
  try {
    const sessionId = await getSessionId();

    const accountResponse = await fetch(
      `${BASE_URL}/account?session_id=${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!accountResponse.ok) {
      const errorData = await accountResponse.json().catch(() => ({}));
      await throwIfAuthFailed(errorData);
      throw new Error("Failed to fetch account ID.");
    }

    const accountData = await accountResponse.json();
    const accountId = accountData.id;

    const response = await fetch(
      `${BASE_URL}/account/${accountId}/favorite?session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: mediaId,
          favorite: favorite,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      await throwIfAuthFailed(errorData);
      throw new Error("Failed to toggle favorite.");
    }

    return await response.json();
  } catch (error) {
    if (error.message === "User is not logged in.") {
      Alert.alert("Error", "You need to log in to add favorites.");
    } else if (error.message === SESSION_EXPIRED_MESSAGE) {
      Alert.alert("Session expired", "Please log in again.");
    } else {
      logger.error("Error toggling favorite:", error);
    }
    throw error;
  }
}

/**
 * Fetches the user's favorite movies and TV shows from TMDb.
 * @param {string} language - Optional language code ("fi-FI", "en-US", etc.)
 */
export async function fetchFavorites(language) {
  try {
    const sessionId = await getSessionId();
    const langCode = await getLanguageCode(language);

    const accountResponse = await fetch(
      `${BASE_URL}/account?session_id=${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!accountResponse.ok) {
      const errorData = await accountResponse.json().catch(() => ({}));
      await throwIfAuthFailed(errorData);
      throw new Error("Failed to fetch account ID.");
    }

    const accountData = await accountResponse.json();
    const accountId = accountData.id;

    const moviesResponse = await fetch(
      `${BASE_URL}/account/${accountId}/favorite/movies?session_id=${sessionId}&language=${langCode}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!moviesResponse.ok) {
      const errorData = await moviesResponse.json().catch(() => ({}));
      await throwIfAuthFailed(errorData);
      throw new Error("Failed to fetch favorites.");
    }
    const moviesData = await moviesResponse.json();

    const tvResponse = await fetch(
      `${BASE_URL}/account/${accountId}/favorite/tv?session_id=${sessionId}&language=${langCode}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!tvResponse.ok) {
      const errorData = await tvResponse.json().catch(() => ({}));
      await throwIfAuthFailed(errorData);
      throw new Error("Failed to fetch favorite TV shows.");
    }

    const tvData = await tvResponse.json();

    return {
      movies: moviesData.results || [],
      tvShows: tvData.results || [],
    };
  } catch (error) {
    if (error.message === SESSION_EXPIRED_MESSAGE) {
      Alert.alert("Session expired", "Please log in again.");
    }
    if (error.message !== "User is not logged in.") {
      logger.error("Error fetching favorites:", error);
    }
    return { movies: [], tvShows: [] };
  }
}
