import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import {
  submitRating,
  deleteRating,
  getRating,
  submitTvRating,
  deleteTvRating,
  getTvRating,
} from "../Api/RatingApi";
import Colors from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * CustomRating component allows users to rate movies or TV shows.
 * It fetches the current rating from the API and allows users to submit or remove their rating.
 *
 * @param {string} id - The ID of the movie or TV show.
 * @param {string} sessionId - The session ID of the user.
 * @param {string} type - The type of content ("movie" or "tv"). Defaults to "movie".
 * @returns {JSX.Element} A component that displays the rating stars and the current rating.
 */
export default function CustomRating({ id, sessionId, type = "movie" }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) {
      console.error("Error: ID is missing!");
      return;
    }

    const fetchRating = async () => {
      if (sessionId && id) {
        const savedRating =
          type === "movie"
            ? await getRating(id, sessionId)
            : await getTvRating(id, sessionId);
        setRating(savedRating / 2);
      }
    };

    fetchRating();
  }, [id, sessionId, type]);

  const handleRating = async (value) => {
    if (!sessionId) {
      Alert.alert("Error", "You need to be logged in to rate.");
      return;
    }

    try {
      const scaledRating = value * 2;
      if (value === 0) {
        await handleRemoveRating();
        return;
      }

      const response =
        type === "movie"
          ? await submitRating(id, scaledRating, sessionId)
          : await submitTvRating(id, scaledRating, sessionId);

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
      const response =
        type === "movie"
          ? await deleteRating(id, sessionId)
          : await deleteTvRating(id, sessionId);

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
