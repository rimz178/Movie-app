import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Rating } from "react-native-ratings";
import { submitRating, deleteRating, getRating } from "../Api/RatingApi";
import Colors from "../Colors/Colors";
import { MaterialIcons } from "@expo/vector-icons";

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
      if (value === 0) {
        await handleRemoveRating();
        return;
      }

      const response = await submitRating(movieId, scaledRating, sessionId);
      if (response.success) {
        setRating(value);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveRating = async () => {
    if (!sessionId) return;

    try {
      const response = await deleteRating(movieId, sessionId);
      if (response.success) {
        setRating(0);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        {rating > 0 && (
          <TouchableOpacity
            onPress={handleRemoveRating}
            style={styles.removeButton}
          >
            <MaterialIcons
              name="remove-circle"
              size={20}
              color={Colors.buttonColor}
            />
          </TouchableOpacity>
        )}
        <Rating
          type="star"
          ratingCount={5}
          imageSize={24}
          startingValue={rating}
          onFinishRating={handleRating}
          style={styles.rating}
          tintColor={Colors.backcolor}
        />
      </View>
      {rating > 0 && <Text style={styles.ratingText}>{rating * 2}/10</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    backgroundColor: "transparent",
  },
  ratingText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 5,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
});
