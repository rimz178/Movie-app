import { useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  discoverMovies,
  discoverSeries,
  fallbackMoviePoster,
  image500,
} from "../Api/ApiParsing";
import { useLanguage } from "../localization/LanguageContext";
import LANGUAGE_CODES from "../localization/languageCodes";
import {
  DISCOVERY_GENRES,
  getDiscoveryGenreConfig,
} from "../utils/discoveryGenres";
import { RecommendationStyles } from "../Styles/RecommendationStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { logger } from "../utils/logger";

const VIBE_OPTIONS = [
  { key: "Action", movieId: 28, tvId: 10759 },
  { key: "Comedy", movieId: 35, tvId: 35 },
  { key: "Drama", movieId: 18, tvId: 18 },
  { key: "Thriller", movieId: 53, tvId: 9648 },
  { key: "Romance", movieId: 10749, tvId: 18 },
  { key: "Horror", movieId: 27, tvId: 9648 },
];

const pickRandomItem = (items, excludedId) => {
  const candidatePool =
    excludedId == null ? items : items.filter((item) => item.id !== excludedId);
  const pool = candidatePool.length > 0 ? candidatePool : items;

  if (!pool.length) return null;

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

const getResultMeta = (item, strings) => {
  const yearSource = item?.release_date || item?.first_air_date || "";
  const year = yearSource ? yearSource.split("-")[0] : null;
  const score = item?.vote_average
    ? `${item.vote_average.toFixed(1)}/10`
    : null;
  const typeLabel =
    item?.media_type === "tv"
      ? strings.Navigation.Series1
      : strings.Navigation.Movies1;

  return [typeLabel, year, score].filter(Boolean).join(" • ");
};

export default function WhatToWatchScreen() {
  const navigation = useNavigation();
  const { strings, language } = useLanguage();
  const [contentType, setContentType] = useState("both");
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortMode, setSortMode] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [resultPool, setResultPool] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const langCode = LANGUAGE_CODES[language] || LANGUAGE_CODES.en;
  const discoveryStrings = strings.WhatToWatch;

  const sortParams = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const newerThreshold = `${currentYear - 4}-01-01`;

    if (sortMode === "topRated") {
      return {
        sort_by: "vote_average.desc",
        "vote_count.gte": "200",
      };
    }

    if (sortMode === "newer") {
      return {
        sort_by: "popularity.desc",
        movieDateKey: "primary_release_date.gte",
        tvDateKey: "first_air_date.gte",
        newerThreshold,
      };
    }

    return {
      sort_by: "popularity.desc",
    };
  }, [sortMode]);

  const getGenreIdForType = (type) => {
    if (selectedGenre) {
      const genreConfig = getDiscoveryGenreConfig(selectedGenre);
      return type === "movie"
        ? genreConfig?.movieId || selectedGenre
        : genreConfig?.tvId || selectedGenre;
    }

    if (selectedVibe) {
      const vibeConfig = VIBE_OPTIONS.find(
        (option) => option.key === selectedVibe,
      );
      return type === "movie" ? vibeConfig?.movieId : vibeConfig?.tvId;
    }

    return null;
  };

  const buildDiscoverParams = (type, page) => {
    const params = {
      include_adult: "false",
      language: langCode,
      page: String(page),
      sort_by: sortParams.sort_by,
    };

    const genreId = getGenreIdForType(type);
    if (genreId) {
      params.with_genres = String(genreId);
    }

    if (sortMode === "newer") {
      const dateKey =
        type === "movie" ? sortParams.movieDateKey : sortParams.tvDateKey;
      params[dateKey] = sortParams.newerThreshold;
    }

    if (sortMode === "topRated") {
      params["vote_count.gte"] = sortParams["vote_count.gte"];
    }

    return params;
  };

  const fetchTypeResults = async (type) => {
    const fetcher = type === "movie" ? discoverMovies : discoverSeries;
    const [pageOne, pageTwo] = await Promise.all([
      fetcher(buildDiscoverParams(type, 1)),
      fetcher(buildDiscoverParams(type, 2)),
    ]);

    return [...(pageOne?.results || []), ...(pageTwo?.results || [])].map(
      (item) => ({
        ...item,
        media_type: type === "movie" ? "movie" : "tv",
      }),
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setHasFetched(true);

    try {
      const requestedTypes =
        contentType === "both" ? ["movie", "tv"] : [contentType];

      const responses = await Promise.all(
        requestedTypes.map((type) => fetchTypeResults(type)),
      );

      const items = responses
        .flat()
        .filter((item) => item.poster_path && (item.title || item.name));

      setResultPool(items);
      setSuggestion(pickRandomItem(items));
    } catch (error) {
      logger.error("Failed to generate watch recommendation:", error);
      setResultPool([]);
      setSuggestion(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReshuffle = () => {
    setSuggestion((currentSuggestion) =>
      pickRandomItem(resultPool, currentSuggestion?.id),
    );
  };

  const openSuggestion = () => {
    if (!suggestion) return;

    if (suggestion.media_type === "tv") {
      navigation.navigate("SeriesDetails", suggestion);
      return;
    }

    navigation.navigate("Movie", suggestion);
  };

  return (
    <SafeAreaProvider style={RecommendationStyles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={RecommendationStyles.content}>
          <View style={RecommendationStyles.heroCard}>
            <Text style={RecommendationStyles.heroTitle}>
              {discoveryStrings.Title}
            </Text>
            <Text style={RecommendationStyles.heroText}>
              {discoveryStrings.Subtitle}
            </Text>
          </View>

          <View style={RecommendationStyles.section}>
            <Text style={RecommendationStyles.sectionTitle}>
              {discoveryStrings.TypeTitle}
            </Text>
            <View style={RecommendationStyles.optionsRow}>
              {[
                { key: "movie", label: discoveryStrings.TypeMovie },
                { key: "tv", label: discoveryStrings.TypeSeries },
                { key: "both", label: discoveryStrings.TypeBoth },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    RecommendationStyles.optionButton,
                    contentType === option.key &&
                      RecommendationStyles.optionButtonActive,
                  ]}
                  onPress={() => setContentType(option.key)}
                >
                  <Text
                    style={[
                      RecommendationStyles.optionText,
                      contentType === option.key &&
                        RecommendationStyles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={RecommendationStyles.section}>
            <Text style={RecommendationStyles.sectionTitle}>
              {discoveryStrings.VibeTitle}
            </Text>
            <View style={RecommendationStyles.optionsRow}>
              {VIBE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    RecommendationStyles.optionButton,
                    selectedVibe === option.key &&
                      RecommendationStyles.optionButtonActive,
                  ]}
                  onPress={() => {
                    const nextValue =
                      selectedVibe === option.key ? null : option.key;
                    setSelectedVibe(nextValue);
                    if (nextValue) {
                      setSelectedGenre(null);
                    }
                  }}
                >
                  <Text
                    style={[
                      RecommendationStyles.optionText,
                      selectedVibe === option.key &&
                        RecommendationStyles.optionTextActive,
                    ]}
                  >
                    {strings.SearchView.Genres[option.key]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={RecommendationStyles.section}>
            <Text style={RecommendationStyles.sectionTitle}>
              {discoveryStrings.GenreTitle}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={RecommendationStyles.chipsRow}
              contentContainerStyle={RecommendationStyles.chipsContent}
            >
              {DISCOVERY_GENRES.map((genre) => (
                <TouchableOpacity
                  key={genre.key}
                  style={[
                    RecommendationStyles.optionButton,
                    selectedGenre === genre.movieId &&
                      RecommendationStyles.optionButtonActive,
                  ]}
                  onPress={() => {
                    const nextValue =
                      selectedGenre === genre.movieId ? null : genre.movieId;
                    setSelectedGenre(nextValue);
                    if (nextValue) {
                      setSelectedVibe(null);
                    }
                  }}
                >
                  <Text
                    style={[
                      RecommendationStyles.optionText,
                      selectedGenre === genre.movieId &&
                        RecommendationStyles.optionTextActive,
                    ]}
                  >
                    {strings.SearchView.Genres[genre.key]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={RecommendationStyles.section}>
            <Text style={RecommendationStyles.sectionTitle}>
              {discoveryStrings.SortTitle}
            </Text>
            <View style={RecommendationStyles.optionsRow}>
              {[
                { key: "popular", label: discoveryStrings.SortPopular },
                { key: "topRated", label: discoveryStrings.SortTopRated },
                { key: "newer", label: discoveryStrings.SortNewer },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    RecommendationStyles.optionButton,
                    sortMode === option.key &&
                      RecommendationStyles.optionButtonActive,
                  ]}
                  onPress={() => setSortMode(option.key)}
                >
                  <Text
                    style={[
                      RecommendationStyles.optionText,
                      sortMode === option.key &&
                        RecommendationStyles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={RecommendationStyles.generateButton}
            onPress={handleGenerate}
          >
            <Text style={RecommendationStyles.generateButtonText}>
              {discoveryStrings.Generate}
            </Text>
          </TouchableOpacity>

          {suggestion ? (
            <View style={RecommendationStyles.resultCard}>
              <Image
                style={RecommendationStyles.poster}
                source={{
                  uri: image500(suggestion.poster_path) || fallbackMoviePoster,
                }}
                progressiveRenderingEnabled
              />
              <View style={RecommendationStyles.resultBody}>
                <Text style={RecommendationStyles.resultMeta}>
                  {getResultMeta(suggestion, strings)}
                </Text>
                <Text style={RecommendationStyles.resultTitle}>
                  {suggestion.title || suggestion.name}
                </Text>
                <Text style={RecommendationStyles.resultOverview}>
                  {suggestion.overview || strings.Other.NoInfo}
                </Text>
                <View style={RecommendationStyles.actionRow}>
                  <TouchableOpacity
                    style={RecommendationStyles.primaryAction}
                    onPress={openSuggestion}
                  >
                    <Text style={RecommendationStyles.primaryActionText}>
                      {discoveryStrings.OpenDetails}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={RecommendationStyles.secondaryAction}
                    onPress={handleReshuffle}
                  >
                    <Text style={RecommendationStyles.secondaryActionText}>
                      {discoveryStrings.Reshuffle}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : hasFetched ? (
            <View style={RecommendationStyles.emptyCard}>
              <Text style={RecommendationStyles.emptyTitle}>
                {discoveryStrings.NoResultsTitle}
              </Text>
              <Text style={RecommendationStyles.emptyText}>
                {discoveryStrings.NoResultsText}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
}
