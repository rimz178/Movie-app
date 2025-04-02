import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Rating } from "react-native-ratings";
import { submitRating } from "../Api/RatingApi";

const MovieRating = ({ movieId, sessionId }) => {
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const handleRating = async (value) => {
    setRating(value);

    if (!sessionId) {
      Alert.alert("Error", "Et ole kirjautunut sisään, arviointia ei voi tallentaa.");
      return;
    }

    try {
      const response = await submitRating(movieId, value, sessionId);
      
      if (response.success) {
        setRated(true);
        Alert.alert("Arvostelu tallennettu", `Annoit ${value} tähteä!`);
      } else {
        Alert.alert("Virhe", "Arvostelua ei voitu tallentaa.");
      }
    } catch (error) {
      console.error("Arvion lähetysvirhe:", error);
      Alert.alert("Virhe", "Tapahtui virhe arvostelun tallentamisessa.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Arvostele tämä elokuva</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        startingValue={rating}
        onFinishRating={handleRating}
      />
      {rated && <Text style={{ color: "green", marginTop: 10 }}>✅ Arvio tallennettu</Text>}
    </View>
  );
};

export default MovieRating;