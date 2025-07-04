import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator, // Lisätty ActivityIndicator
} from "react-native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { getRatedMovies } from "../Api/RatingApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RatingListStyles } from "../Styles/RatingListStyles";
import { CommonStyles } from "../Styles/CommonStyles";
import { logger } from "../utils/logger";
/**
 * MovieRatingList component fetches and displays a list of rated movies.
 *
 * @returns {JSX.Element} A component that displays a list of rated movies.
 */
const MovieRatingList = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
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

    const fetchRatedMovies = async () => {
      try {
        const movies = await getRatedMovies(sessionId);
        setRatedMovies(movies || []);
      } catch (err) {
        logger.error("Error fetching movie ratings:", err);
        setError("Failed to fetch movie ratings. Please try again later.");
      }
    };

    fetchRatedMovies();
  }, [sessionId]);

  const handleMoviePress = (movie) => {
    navigation.navigate("Movie", movie);
  };

  if (error) {
    return (
      <View style={RatingListStyles.errorContainer}>
        <Text style={RatingListStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (ratedMovies.length === 0) {
    return (
      <View style={RatingListStyles.emptyContainer}>
        <Text style={RatingListStyles.emptyText}>No rated movies</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={RatingListStyles.titleText}>Rated Movies</Text>
      <FlatList
        data={ratedMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={RatingListStyles.listContainer}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleMoviePress(item)}>
            <View style={RatingListStyles.card}>
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
                onLoadStart={() =>
                  setLoadingImages({ ...loadingImages, [item.id]: true })
                }
                onLoadEnd={() =>
                  setLoadingImages({ ...loadingImages, [item.id]: false })
                }
                progressiveRenderingEnabled={true}
              />
              <Text style={RatingListStyles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default MovieRatingList;
