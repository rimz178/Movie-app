import { TMDB_API_KEY } from "@env";
const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = TMDB_API_KEY;


export const submitRating = async (movieId, rating, sessionId, isGuest = false) => {
  if (!sessionId) {
    console.error("Error: Session ID is missing!");
    throw new Error("Session ID is required to submit a rating.");
  }

  const sessionParam = isGuest ? `guest_session_id=${sessionId}` : `session_id=${sessionId}`;
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
      throw new Error(responseData.status_message || "Failed to submit rating.");
    }

    return responseData;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};

export const deleteRating = async (movieId, sessionId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json;  
  } catch (error) {
    console.error("Error deleting rating:", error);
    throw error;
  }
};