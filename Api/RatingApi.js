import { TMDB_API_KEY } from "@env";
const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = TMDB_API_KEY;

export const submitRating = async (
  movieId,
  rating,
  sessionId,
  isGuest = false,
) => {
  if (!sessionId) {
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to submit a rating.");
  }

  const sessionParam = isGuest
    ? `guest_session_id=${sessionId}`
    : `session_id=${sessionId}`;
  const url = `${apiBaseUrl}/movie/${movieId}/rating?api_key=${apiKey}&${sessionParam}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ value: rating }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Failed to submit rating:", responseData);
      throw new Error(
        responseData.status_message || "Failed to submit rating.",
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error submitting rating:", error);
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
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to submit a rating.");
  }

  const sessionParam = isGuest
    ? `guest_session_id=${sessionId}`
    : `session_id=${sessionId}`;
  const url = `${apiBaseUrl}/tv/${tvId}/rating?api_key=${apiKey}&${sessionParam}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ value: rating }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Failed to submit TV rating:", responseData);
      throw new Error(
        responseData.status_message || "Failed to submit TV rating.",
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error submitting TV rating:", error);
    throw error;
  }
};

export const deleteRating = async (movieId, sessionId, isGuest = false) => {
  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/movie/${movieId}/rating?api_key=${apiKey}&${sessionParam}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove rating");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing rating:", error);
    return { success: false };
  }
};

export const deleteTvRating = async (tvId, sessionId, isGuest = false) => {
  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/tv/${tvId}/rating?api_key=${apiKey}&${sessionParam}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove TV rating");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing TV rating:", error);
    return { success: false };
  }
};

export const getRating = async (movieId, sessionId, isGuest = false) => {
  if (!sessionId) {
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch ratings.");
  }

  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/movie/${movieId}/account_states?api_key=${apiKey}&${sessionParam}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch movie rating:", data);
      throw new Error(data.status_message || "Failed to fetch movie rating.");
    }

    return data.rated ? data.rated.value : 0;
  } catch (error) {
    console.error("Error fetching movie rating:", error);
    throw error;
  }
};

export const getTvRating = async (tvId, sessionId, isGuest = false) => {
  if (!sessionId) {
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch TV ratings.");
  }

  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/tv/${tvId}/account_states?api_key=${apiKey}&${sessionParam}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch TV rating:", data);
      throw new Error(data.status_message || "Failed to fetch TV rating.");
    }

    return data.rated ? data.rated.value : 0;
  } catch (error) {
    console.error("Error fetching TV rating:", error);
    throw error;
  }
};

export const getRatedMovies = async (sessionId, isGuest = false) => {
  if (!sessionId) {
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch rated movies.");
  }

  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/account/me/rated/movies?api_key=${apiKey}&${sessionParam}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch rated movies:", data);
      throw new Error(data.status_message || "Failed to fetch rated movies.");
    }

    return data.results || [];
  } catch (error) {
    console.error("Error fetching rated movies:", error);
    throw error;
  }
};
export const getRatedTvShows = async (sessionId, isGuest = false) => {
  if (!sessionId) {
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to fetch rated TV shows.");
  }

  try {
    const sessionParam = isGuest
      ? `guest_session_id=${sessionId}`
      : `session_id=${sessionId}`;
    const url = `${apiBaseUrl}/account/me/rated/tv?api_key=${apiKey}&${sessionParam}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch rated TV shows:", data);
      throw new Error(data.status_message || "Failed to fetch rated TV shows.");
    }

    return data.results || [];
  } catch (error) {
    console.error("Error fetching rated TV shows:", error);
    throw error;
  }
};
