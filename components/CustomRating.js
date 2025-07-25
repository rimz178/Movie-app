import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import {
  submitRating,
  deleteRating,
  getRating,
  submitTvRating,
  deleteTvRating,
  getTvRating,
} from "../Api/RatingApi";
import { MaterialIcons } from "@expo/vector-icons";
import { RatingStyles } from "../Styles/RatingStyles";
import Colors from "../Styles/Colors";
import { logger } from "../utils/logger";
import { useLanguage } from "../localication/LanguageContext";
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
  const { strings } = useLanguage();

  useEffect(() => {
    if (!id) {
      logger.error("Error: ID is missing!");
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
      logger.error("Error:", error);
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
      logger.error("Error:", error);
    }
  };

  return (
    <View style={RatingStyles.container}>
      <View style={RatingStyles.ratingContainer}>
        {rating > 0 && (
          <TouchableOpacity
            onPress={handleRemoveRating}
            style={RatingStyles.removeButton}
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
          style={RatingStyles.rating}
          tintColor={Colors.backcolor}
        />
      </View>
      {rating > 0 && (
        <Text style={RatingStyles.ratingText}>{rating * 2}/10</Text>
      )}
    </View>
  );
}
