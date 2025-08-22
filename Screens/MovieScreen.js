import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomRating from "../components/CustomRating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchWatchProviders,
  image185,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import Cast from "../components/Cast";
import WatchProviders from "../components/WatchProviders";
import { toggleFavorite, fetchFavorites } from "../Api/Favorites";
import { SharedStyles } from "../Styles/SharedStyles";
import { logger } from "../utils/logger";
import { useLanguage } from "../localization/LanguageContext";
import LANGUAGE_CODES from "../localization/languageCodes";

/**
 * Displays detailed information about a movie, including its cast, genres, and watch providers.
 *
 * @param {object} route - Contains the parameters passed to this screen, such as the movie ID.
 * @param {object} navigation - Navigation object for navigating between screens.
 * @returns {JSX.Element} - The movie details screen.
 */
export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingPoster, setLoadingPoster] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userSessionId, setUserSessionId] = useState(null);
  const { strings, language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getWatchProviders(item.id);
    fetchFavoriteStatus(item.id);
    fetchUserSessionId();
  }, [item]);

  const fetchUserSessionId = async () => {
    try {
      const sessionId = await AsyncStorage.getItem("session_id");
      if (sessionId) {
        setUserSessionId(sessionId);
      }
    } catch (error) {
      logger.error("Error fetching session ID:", error);
    }
  };
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data?.cast) setCast(data.cast);
  };

  const getWatchProviders = async (id) => {
    const data = await fetchWatchProviders(id);

    if (data?.results) {
      const countryCode = "FI";
      const providersForCountry = data.results[countryCode] || {};

      const providersArray = [
        ...(providersForCountry.flatrate || []),
        ...(providersForCountry.buy || []),
        ...(providersForCountry.rent || []),
      ];

      setWatchProviders(providersArray);
    }
  };

  const fetchFavoriteStatus = async (movieId) => {
    try {
      const favorites = await fetchFavorites();
      const isMovieFavorite =
        favorites.movies?.some((favorite) => favorite.id === movieId) || false;
      setIsFavorite(isMovieFavorite);
    } catch (error) {
      logger.error("Error fetching favorite status:", error);
    }
  };
  const handleToggleFavorite = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      const response = await toggleFavorite(
        movie.id,
        newFavoriteStatus,
        "movie",
      );
      Alert.alert(
        "Favorites",
        newFavoriteStatus
          ? `${movie.title} has been added to your favorites!`
          : `${movie.title} has been removed from your favorites!`,
      );
      if (response.success) {
        setIsFavorite(newFavoriteStatus);
      } else {
        logger.error("Failed to toggle favorite:", response);
      }
    } catch (error) {
      logger.error("Error toggling favorite:", error);
    }
  };
  return (
    <SafeAreaView style={SharedStyles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[0]}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          updateCellsBatchingPeriod={50}
          windowSize={3}
          removeClippedSubviews={true}
          renderItem={() => (
            <View style={SharedStyles.content}>
              <View style={SharedStyles.images}>
                <Image
                  style={SharedStyles.insideImage}
                  source={{
                    uri: image185(movie?.poster_path) || fallbackMoviePoster,
                  }}
                  onLoadStart={() => setLoadingPoster(true)}
                  onLoadEnd={() => setLoadingPoster(false)}
                  progressiveRenderingEnabled={true}
                />
                <TouchableOpacity
                  onPress={handleToggleFavorite}
                  style={SharedStyles.favoriteButton}
                >
                  <MaterialIcons
                    name={isFavorite ? "favorite" : "favorite-border"}
                    size={30}
                    color={isFavorite ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                {movie?.id && (
                  <CustomRating
                    id={movie.id}
                    sessionId={userSessionId}
                    type="movie"
                  />
                )}
                <Text style={SharedStyles.titletext}>{movie?.title}</Text>
                {movie?.id ? (
                  <Text style={SharedStyles.textStatus}>
                    {movie?.status} • {movie?.release_date?.split("-")[0]} •
                    {movie?.runtime} min
                  </Text>
                ) : null}
                {movie?.vote_average && (
                  <Text style={SharedStyles.textStatus}>
                    {strings.Other.Rating}: {movie.vote_average.toFixed(1)}/10
                  </Text>
                )}
              </View>

              <View style={SharedStyles.genre}>
                {movie?.genres?.map((genre, index) => {
                  const dot = index + 1 !== movie.genres.length;
                  return (
                    <Text key={genre.id} style={SharedStyles.textStatus}>
                      {genre?.name} {dot ? "•" : null}
                    </Text>
                  );
                })}
              </View>

              <Text style={SharedStyles.descriptionText}>
                {movie?.overview ? movie.overview : strings.Other.NoInfo}
              </Text>

              <Cast navigation={navigation} cast={cast} />
              <WatchProviders
                providers={watchProviders}
                tmdbId={movie.id}
                type="movie"
                countryCode={LANGUAGE_CODES[language]}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
