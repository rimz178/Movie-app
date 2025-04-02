import { TMDB_API_KEY } from "@env";
const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = TMDB_API_KEY;

export const getGuestSession = async () => {
    try{
      const response = await fetch(`${apiBaseUrl}/authentication/guest_session/new?api_key=${apiKey}`);
      const json = await response.json();
      return json.guest_session_id;

    } catch (error) {
        console.error("Guest session error:", error);
        throw error
        
    }
}

export const submitRating = async (movieId, rating, sessionId) => { 
  if (!sessionId) {
      throw new Error("Session ID is required to submit a rating.");
  }
  try {
    const response = await fetch(`${apiBaseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
          value: rating,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
}