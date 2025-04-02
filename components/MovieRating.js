import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import { submitRating, deleteRating, getRating } from "../Api/RatingApi";
import Colors from "../Colors/Colors";

export default function MovieRating({ movieId, sessionId }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      if (sessionId && movieId) {
        const savedRating = await getRating(movieId, sessionId);
        setRating(savedRating / 2);
      }
    };
    fetchRating();
  }, [movieId, sessionId]);

  const handleRating = async (value) => {
    if (!sessionId) {
      Alert.alert("Error", "You need to be logged in to rate movies.");
      return;
    }

    try {
      const scaledRating = value * 2;
      const response = await submitRating(movieId, scaledRating, sessionId);
      if (response.success) {
        setRating(value);
        Alert.alert("Success", "Rating submitted successfully!");
      } else {
        Alert.alert(
          "Error",
          response.status_message || "Failed to submit rating",
        );
        console.error("Rating submission failed:", response);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit rating.");
      console.error("Error:", error);
    }
  };

  const handleRemoveRating = async () => {
    if (!sessionId) {
      Alert.alert("Error", "You need to be logged in to remove your rating.");
      return;
    }

    try {
      const response = await deleteRating(movieId, sessionId);
      if (response.success) {
        setRating(0);
        Alert.alert("Success", "Rating removed successfully!");
      } else {
        Alert.alert("Error", "Failed to remove rating.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to remove rating.");
      console.error("Error:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.text}>Rate this Movie</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        startingValue={rating}
        onFinishRating={handleRating}
      />
      <Text style={styles.text}>
        Current Rating: {rating ? rating * 2 : 0}/10
      </Text>
      {rating > 0 && (
        <Button
          style={styles.button}
          title="Remove Rating"
          onPress={handleRemoveRating}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    padding: 10,
    borderRadius: 5,
  },
});
