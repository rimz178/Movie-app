import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiBaseUrl = "https://api.themoviedb.org/3";
import { logger } from "../utils/logger";
const apiToken =
  Constants.extra?.TMDB_BEARER_TOKEN ||
  Constants.expoConfig?.extra?.TMDB_BEARER_TOKEN ||
  Constants.manifest?.extra?.TMDB_BEARER_TOKEN;

export const submitRating = async (
  movieId,
  rating,
  sessionId,
  isGuest = false,
) => {
  if (!sessionId) {
    logger.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to submit a rating.");
  }

  const sessionParam = isGuest
    ? `guest_session_id=${sessionId}`
    : `session_id=${sessionId}`;
  const url = `${apiBaseUrl}/movie/${movieId}/rating?${sessionParam}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ value: rating }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      logger.error("Failed to submit rating:", responseData);
      throw new Error(
        responseData.status_message || "Failed to submit rating.",
      );
    }

    return responseData;
  } catch (error) {
    logger.error("Error submitting rating:", error);
    throw error;
  }
};

export const submitTvRating = async (
  tvId,
  rating,
  sessionId,
  isGuest = false,
) => {
  if (!sessionId) {
    logger.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to submit a rating.");
  }

  const sessionParam = isGuest
    ? `guest_session_id=${sessionId}`
    : `session_id=${sessionId}`;
  const url = `${apiBaseUrl}/tv/${tvId}/rating?${sessionParam}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ value: rating }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      logger.error("Failed to submit TV rating:", responseData);
      throw new Error(
        responseData.status_message || "Failed to submit TV rating.",
      );
    }

    return responseData;
  } catch (error) {
    logger.error("Error submitting TV rating:", error);
    throw error;
  }
};

export const deleteRating = async (movieId, sessionId, isGuest = false) => {
  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/movie/${movieId}/rating?${sessionParam}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove rating");
    }

    return await response.json();
  } catch (error) {
    logger.error("Error removing rating:", error);
    return { success: false };
  }
};

export const deleteTvRating = async (tvId, sessionId, isGuest = false) => {
  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/tv/${tvId}/rating?${sessionParam}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove TV rating");
    }

    return await response.json();
  } catch (error) {
    logger.error("Error removing TV rating:", error);
    return { success: false };
  }
};

export const getRating = async (movieId, sessionId, isGuest = false) => {
  if (!sessionId) {
    logger.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch ratings.");
  }

  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/movie/${movieId}/account_states?${sessionParam}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      logger.error("Failed to fetch movie rating:", data);
      throw new Error(data.status_message || "Failed to fetch movie rating.");
    }

    return data.rated ? data.rated.value : 0;
  } catch (error) {
    logger.error("Error fetching movie rating:", error);
    throw error;
  }
};

export const getTvRating = async (tvId, sessionId, isGuest = false) => {
  if (!sessionId) {
    logger.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch TV ratings.");
  }

  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/tv/${tvId}/account_states?${sessionParam}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      logger.error("Failed to fetch TV rating:", data);
      throw new Error(data.status_message || "Failed to fetch TV rating.");
    }

    return data.rated ? data.rated.value : 0;
  } catch (error) {
    logger.error("Error fetching TV rating:", error);
    throw error;
  }
};

// Apufunktio kielen hakemiseen
const getLanguageCode = async (language) => {
  if (language) return language === "fi" ? "fi-FI" : "en-US";
  const lang = await AsyncStorage.getItem("app_language");
  return lang === "fi" ? "fi-FI" : "en-US";
};

export const getRatedMovies = async (sessionId, isGuest = false, language) => {
  if (!sessionId) {
    logger.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch rated movies.");
  }

  try {
    const langCode = await getLanguageCode(language);
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/account/me/rated/movies?${sessionParam}&language=${langCode}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      logger.error("Failed to fetch rated movies:", data);
      throw new Error(data.status_message || "Failed to fetch rated movies.");
    }

    return data.results || [];
  } catch (error) {
    logger.error("Error fetching rated movies:", error);
    throw error;
  }
};

export const getRatedTvShows = async (sessionId, isGuest = false, language) => {
  if (!sessionId) {
    logger.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch rated TV shows.");
  }

  try {
    const langCode = await getLanguageCode(language);
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/account/me/rated/tv?${sessionParam}&language=${langCode}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      logger.error("Failed to fetch rated TV shows:", data);
      throw new Error(data.status_message || "Failed to fetch rated TV shows.");
    }

    return data.results || [];
  } catch (error) {
    logger.error("Error fetching rated TV shows:", error);
    throw error;
  }
};
