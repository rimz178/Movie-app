import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { getRatedTvShows } from "../Api/RatingApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RatingListStyles } from "../Styles/RatingListStyles";
import { CommonStyles } from "../Styles/CommonStyles"; // Lisätty CommonStyles
import { logger } from "../utils/logger";

/**
 * TvRatingList component fetches and displays a list of rated TV shows.
 *
 * @returns {JSX.Element} A component that displays a list of rated TV shows.
 */

const TvRatingList = () => {
  const [ratedTvShows, setRatedTvShows] = useState([]);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserSessionId = async () => {
      try {
        const storedSessionId = await AsyncStorage.getItem("session_id");
        if (storedSessionId) {
          setSessionId(storedSessionId);
        } else {
          setError("Session ID is missing. Please log in to view ratings.");
        }
      } catch (err) {
        logger.error("Error fetching session ID:", err);
        setError("Failed to fetch session ID. Please try again later.");
      }
    };

    fetchUserSessionId();
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const fetchRatedTvShows = async () => {
      try {
        const tvShows = await getRatedTvShows(sessionId);
        setRatedTvShows(tvShows || []);
      } catch (err) {
        logger.error("Error fetching rated TV shows:", err);
        setError("Failed to fetch rated TV shows. Please try again later.");
      }
    };

    fetchRatedTvShows();
  }, [sessionId]);

  const handleTvPress = (tvShow) => {
    navigation.navigate("SeriesDetails", tvShow);
  };

  if (error) {
    return (
      <View style={RatingListStyles.errorContainer}>
        <Text style={RatingListStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (ratedTvShows.length === 0) {
    return (
      <View style={RatingListStyles.emptyContainer}>
        <Text style={RatingListStyles.emptyText}>No rated TV shows</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={RatingListStyles.titleText}>Rated Tv-series</Text>
      <FlatList
        data={ratedTvShows}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={RatingListStyles.listContainer}
        // Lisätyt FlatList-optimoinnit:
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleTvPress(item)}>
            <View style={RatingListStyles.card}>
              {/* Lisätty latausanimaatio */}
              {loadingImages[item.id] && (
                <ActivityIndicator
                  style={CommonStyles.loading}
                  size="small"
                  color="#E21818"
                />
              )}
              <Image
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={RatingListStyles.poster}
                resizeMode="cover"
                // Lisätty kuvan latauksen käsittelijät
                onLoadStart={() =>
                  setLoadingImages({ ...loadingImages, [item.id]: true })
                }
                onLoadEnd={() =>
                  setLoadingImages({ ...loadingImages, [item.id]: false })
                }
                progressiveRenderingEnabled={true}
              />
              <Text style={RatingListStyles.title} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default TvRatingList;
