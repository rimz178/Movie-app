import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Rating } from "react-native-ratings";
import { submitRating, deleteRating } from "../Api/RatingApi"; // Muista lisätä deleteRating API:si

export default function MovieRating({ movieId, sessionId }) {
  const [rating, setRating] = useState(0);

  const handleRating = async (value) => {
    const scaledRating = value;

    if (!sessionId) {
      alert("You need to be logged in to rate movies.");
      return;
    }

    try {
      const response = await submitRating(movieId, scaledRating, sessionId); 
      alert("Rating submitted successfully!");
    } catch (error) {
      alert("Failed to submit rating.");
      console.error("Error:", error);
    }
  };

  // Poistaa arvostelun
  const handleRemoveRating = async () => {
    if (!sessionId) {
      alert("You need to be logged in to remove your rating.");
      return;
    }

    try {
      const response = await deleteRating(movieId, sessionId); 
      if (response.success) {
        setRating(0);
        alert("Rating removed successfully!");
      } else {
        alert("Failed to remove rating.");
      }
    } catch (error) {
      alert("Failed to remove rating.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Rate this Movie</Text>
      
      {/* Rating - Tähtiarvostelu */}
      <Rating
        type="star"
        ratingCount={5} // Aseta arviointitähdet 1–10
        imageSize={30} // Tähden koko
        startingValue={rating} 
        onFinishRating={(value) => handleRating(value * 2)}
      />

      <Text style={{ fontSize: 18, marginTop: 10 }}>Current Rating: {rating}</Text>

      {/* Nollausnappi */}
      <Button title="Remove Rating" onPress={handleRemoveRating} color="#E74C3C" />
    </View>
  );
}