import { TMDB_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_KEY = TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Helper function to get the session ID from AsyncStorage.
 *
 * @returns {Promise<string>} - The session ID.
 * @throws {Error} - If the session ID is not found.
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
 *
 * @param {number} mediaId - The ID of the media item.
 * @param {boolean} favorite - Whether to add or remove the media item from favorites.
 * @param {string} mediaType - The type of media ("movie" or "tv").
 * @returns {Promise<object>} - The response from the TMDb API.
 */
export async function toggleFavorite(mediaId, favorite, mediaType = "movie") {
  try {
    const sessionId = await getSessionId();

    const accountResponse = await fetch(
      `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`,
    );

    if (!accountResponse.ok) {
      throw new Error("Failed to fetch account ID.");
    }

    const accountData = await accountResponse.json();
    const accountId = accountData.id;

    const response = await fetch(
      `${BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
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
      throw new Error("Failed to toggle favorite.");
    }

    return await response.json();
  } catch (error) {
    if (error.message === "User is not logged in.") {
      Alert.alert("Error", "You need to log in to add favorites.");
    } else {
      console.error("Error toggling favorite:", error);
    }
    throw error;
  }
}

/**
 * Fetches the user's favorite movies from TMDb.
 *
 * @returns {Promise<object>} - The response from the TMDb API.
 */
export async function fetchFavorites() {
  try {
    const sessionId = await getSessionId();

    const accountResponse = await fetch(
      `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`,
    );

    if (!accountResponse.ok) {
      throw new Error("Failed to fetch account ID.");
    }

    const accountData = await accountResponse.json();
    const accountId = accountData.id;

    const moviesResponse = await fetch(
      `${BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`,
    );

    if (!moviesResponse.ok) {
      throw new Error("Failed to fetch favorites.");
    }
    const moviesData = await moviesResponse.json();
    const tvResponse = await fetch(
      `${BASE_URL}/account/${accountId}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}`,
    );

    if (!tvResponse.ok) {
      throw new Error("Failed to fetch favorite TV shows.");
    }

    const tvData = await tvResponse.json();

    return {
      movies: moviesData.results || [],
      tvShows: tvData.results || [],
    };
  } catch (error) {
    if (error.message !== "User is not logged in.") {
      console.error("Error fetching favorites:", error);
    }
    return { movies: [], tvShows: [] };
  }
}
