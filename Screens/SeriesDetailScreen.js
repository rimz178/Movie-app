import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  fetchSeriesDetails,
  fetchSeriesCredits,
  fetchSeriesWatchProviders,
  image500,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import WatchProviders from "../components/WatchProviders";
import { toggleFavorite, fetchFavorites } from "../Api/Favorites";
import CustomRating from "../components/CustomRating";
import { SharedStyles } from "../Styles/SharedStyles";
import { logger } from "../utils/logger";
import LANGUAGE_CODES from "../localization/languageCodes";
import { useLanguage } from "../localization/LanguageContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
/**
 * Displays detailed information about a series, including its cast, genres, and watch providers.
 *
 * @returns {JSX.Element} - The series details screen.
 */
export default function SeriesDetailScreen() {
  const { params: series } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [seriesDetails, setSeriesDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchProviders, setWatchProviders] = useState([]);
  const [userSessionId, setUserSessionId] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const { strings, language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    getSeriesDetails(series.id);
    getSeriesCredits(series.id);
    getSeriesWatchProviders(series.id);
    fetchFavoriteStatus(series.id);
    fetchUserSessionId();
  }, [series.id]);

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

  const getSeriesDetails = async (id) => {
    const data = await fetchSeriesDetails(id, LANGUAGE_CODES[language]);
    if (data) setSeriesDetails(data);
    setLoading(false);
  };

  const getSeriesCredits = async (id) => {
    const data = await fetchSeriesCredits(id);
    if (data?.cast) setCast(data.cast);
  };

  const getSeriesWatchProviders = async (id) => {
    const data = await fetchSeriesWatchProviders(id);
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

  const fetchFavoriteStatus = async (seriesId) => {
    try {
      const favorites = await fetchFavorites();
      const isSeriesFavorite =
        favorites.tvShows?.some((favorite) => favorite.id === seriesId) ||
        false;
      setIsFavorite(isSeriesFavorite);
    } catch (error) {
      logger.error("Error fetching favorite status:", error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      const response = await toggleFavorite(series.id, newFavoriteStatus, "tv");
      Alert.alert(
        "Favorites",
        newFavoriteStatus
          ? `${seriesDetails.name} has been added to your favorites!`
          : `${seriesDetails.name} has been removed from your favorites!`,
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
    <SafeAreaProvider style={SharedStyles.container}>
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
                    uri:
                      image500(seriesDetails?.backdrop_path) ||
                      fallbackMoviePoster,
                  }}
                  onLoadStart={() => setLoadingImage(true)}
                  onLoadEnd={() => setLoadingImage(false)}
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
                <CustomRating
                  id={seriesDetails.id}
                  sessionId={userSessionId}
                  type="tv"
                />
                <Text style={SharedStyles.title}>{seriesDetails?.name}</Text>
                {series?.id ? (
                  <Text style={SharedStyles.textStatus}>
                    {seriesDetails?.status} •{" "}
                    {seriesDetails?.first_air_date?.split("-")[0]} •
                    {seriesDetails?.number_of_seasons} {strings.Series.Seasons}{" "}
                    • {seriesDetails?.number_of_episodes}{" "}
                    {strings.Series.Episodes}
                  </Text>
                ) : null}
                {series?.id ? (
                  <Text style={SharedStyles.textStatus}>
                    {strings.Series.ReleasedSeasons}:{" "}
                    {seriesDetails?.seasons
                      ? seriesDetails.seasons.filter(
                          (s) =>
                            s.season_number > 0 &&
                            s.air_date &&
                            new Date(s.air_date) <= new Date(),
                        ).length
                      : "-"}
                  </Text>
                ) : null}
                {seriesDetails?.vote_average && (
                  <Text style={SharedStyles.textStatus}>
                    {strings.Other.Rating}:{" "}
                    {seriesDetails.vote_average.toFixed(1)}/10
                  </Text>
                )}
              </View>
              <View style={SharedStyles.genre}>
                {seriesDetails?.genres?.map((genre) => (
                  <Text key={genre.id} style={SharedStyles.textStatus}>
                    {genre?.name}
                  </Text>
                ))}
              </View>
              <View>
                <Text style={SharedStyles.descriptionText}>
                  {seriesDetails?.overview
                    ? seriesDetails.overview
                    : strings.Other.NoInfo}
                </Text>
                <Cast navigation={navigation} cast={cast} />
                <WatchProviders
                  providers={watchProviders}
                  tmdbId={seriesDetails.id}
                  type="tv"
                  countryCode={LANGUAGE_CODES[language]}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaProvider>
  );
}
