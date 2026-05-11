import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextInput,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { logger } from "../utils/logger";
import { debounce } from "lodash";
import Loading from "./Loading";
import {
  image185,
  searchMovies,
  searchSeries,
  searchPeople,
  discoverMovies,
  discoverSeries,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchStyles } from "../Styles/SearchStyles";
import { useLanguage } from "../localization/LanguageContext";
import LANGUAGE_CODES from "../localization/languageCodes";
import { detectGenreFromText } from "../utils/genreKeywords";
import {
  DISCOVERY_GENRES,
  getDiscoveryGenreConfig,
} from "../utils/discoveryGenres";

/**
 * SearchBars component for searching movies, series and actors.
 *
 * @returns {JSX.Element} - The search bar and results list.
 */
export default function SearchBars() {
  const navigation = useNavigation();
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const [searchText, setSearchText] = useState("");
  const { strings, language } = useLanguage();
  const langCode = LANGUAGE_CODES[language] || LANGUAGE_CODES.en;
  const searchViewStrings = strings.SearchView;
  const recommendationStrings = strings.WhatToWatch;
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [mediaFilter, setMediaFilter] = useState("both");
  const [isGenreSectionOpen, setIsGenreSectionOpen] = useState(false);
  const [isDiscoverPanelCollapsed, setIsDiscoverPanelCollapsed] =
    useState(false);

  const handleSearch = useCallback(
    async (value) => {
      if (value && value.length > 2) {
        setLoading(true);

        const detectedGenre = detectGenreFromText(value);

        requestAnimationFrame(async () => {
          try {
            if (detectedGenre) {
              const genreConfig = getDiscoveryGenreConfig(detectedGenre);
              const movieGenreId = genreConfig?.movieId || detectedGenre;
              const tvGenreId = genreConfig?.tvId || detectedGenre;
              const [moviesData, seriesData] = await Promise.all([
                discoverMovies({
                  with_genres: movieGenreId,
                  language: langCode,
                  page: "1",
                  sort_by: "popularity.desc",
                }),
                discoverSeries({
                  with_genres: tvGenreId,
                  language: langCode,
                  page: "1",
                  sort_by: "popularity.desc",
                }),
              ]);

              const genreResults = [
                ...(moviesData?.results || []).slice(0, 5).map((item) => ({
                  ...item,
                  media_type: "movie",
                })),
                ...(seriesData?.results || []).slice(0, 5).map((item) => ({
                  ...item,
                  media_type: "tv",
                })),
              ];

              setResult(genreResults);
            } else {
              const [moviesData, seriesData, peopleData] = await Promise.all([
                searchMovies({
                  query: value,
                  include_adult: "false",
                  language: langCode,
                  page: "1",
                  per_page: "5",
                }),
                searchSeries({
                  query: value,
                  include_adult: "false",
                  language: langCode,
                  page: "1",
                  per_page: "5",
                }),
                searchPeople({
                  query: value,
                  include_adult: "false",
                  language: langCode,
                  page: "1",
                  per_page: "5",
                }),
              ]);

              const searchResults = [
                ...(moviesData?.results || []).map((item) => ({
                  ...item,
                  media_type: "movie",
                })),
                ...(seriesData?.results || []).map((item) => ({
                  ...item,
                  media_type: "tv",
                })),
                ...(peopleData?.results || []).map((item) => ({
                  ...item,
                  media_type: "person",
                })),
              ];

              const searchValueLower = value.toLowerCase();
              const sortedResults = searchResults.sort((a, b) => {
                const aTitle = (a.title || a.name || "").toLowerCase();
                const bTitle = (b.title || b.name || "").toLowerCase();
                if (aTitle === searchValueLower && bTitle !== searchValueLower)
                  return -1;
                if (bTitle === searchValueLower && aTitle !== searchValueLower)
                  return 1;
                if (
                  aTitle.includes(searchValueLower) &&
                  !bTitle.includes(searchValueLower)
                )
                  return -1;
                if (
                  bTitle.includes(searchValueLower) &&
                  !aTitle.includes(searchValueLower)
                )
                  return 1;
                return (b.popularity || 0) - (a.popularity || 0);
              });

              setResult(sortedResults.slice(0, 50));
            }
          } catch (error) {
            logger.error("Error fetching search results:", error);
            setResult([]);
          } finally {
            setLoading(false);
          }
        });
      } else if (!value || value.length === 0) {
        setResult([]);
        setLoading(false);
      }
    },
    [langCode],
  );

  const handleTextDebounce = useMemo(
    () => debounce(handleSearch, 400),
    [handleSearch],
  );

  useEffect(() => {
    return () => {
      handleTextDebounce.cancel();
    };
  }, [handleTextDebounce]);

  const fetchByGenre = useCallback(
    async (genreId, filter) => {
      setLoading(true);
      try {
        const genreConfig = getDiscoveryGenreConfig(genreId);
        let items = [];
        if (filter === "both" || filter === "movie") {
          const moviesData = await discoverMovies({
            with_genres: genreConfig?.movieId || genreId,
            language: langCode,
            page: "1",
            sort_by: "popularity.desc",
          });
          items = [
            ...items,
            ...(moviesData?.results || []).map((item) => ({
              ...item,
              media_type: "movie",
            })),
          ];
        }
        if (filter === "both" || filter === "tv") {
          const seriesData = await discoverSeries({
            with_genres: genreConfig?.tvId || genreId,
            language: langCode,
            page: "1",
            sort_by: "popularity.desc",
          });
          items = [
            ...items,
            ...(seriesData?.results || []).map((item) => ({
              ...item,
              media_type: "tv",
            })),
          ];
        }
        items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        setResult(items.slice(0, 40));
      } catch (error) {
        logger.error("Error fetching genre results:", error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    },
    [langCode],
  );

  useEffect(() => {
    if (selectedGenre && !searchText) {
      fetchByGenre(selectedGenre, mediaFilter);
    }
  }, [selectedGenre, mediaFilter, fetchByGenre, searchText]);

  return (
    <View style={SearchStyles.container}>
      <View style={SearchStyles.search}>
        <TextInput
          style={SearchStyles.textinput}
          placeholder={strings.Navigation.Search}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            if (text) setSelectedGenre(null);
            handleTextDebounce(text);
          }}
          placeholderTextColor="white"
        />
        <TouchableOpacity
          onPress={() => {
            setSearchText("");
            setSelectedGenre(null);
            setResult([]);
            setLoading(false);
            navigation.navigate("HomeTab");
          }}
        >
          <MaterialIcons style={SearchStyles.icon} size={38} name="close" />
        </TouchableOpacity>
      </View>

      {!searchText && (
        <>
          {!isDiscoverPanelCollapsed && (
            <TouchableOpacity
              style={SearchStyles.recommendationCard}
              onPress={() => navigation.navigate("WhatToWatch")}
              activeOpacity={0.9}
            >
              <Text style={SearchStyles.recommendationEyebrow}>
                {recommendationStrings.QuickPick}
              </Text>
              <Text style={SearchStyles.recommendationTitle}>
                {recommendationStrings.Title}
              </Text>
              <Text style={SearchStyles.recommendationText}>
                {recommendationStrings.SearchCardText}
              </Text>
              <View style={SearchStyles.recommendationButton}>
                <Text style={SearchStyles.recommendationButtonText}>
                  {recommendationStrings.OpenButton}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={SearchStyles.discoverToggleWrap}>
            <TouchableOpacity
              style={[
                SearchStyles.discoverToggleButton,
                isDiscoverPanelCollapsed
                  ? SearchStyles.discoverToggleButtonCollapsed
                  : SearchStyles.discoverToggleButtonExpanded,
              ]}
              onPress={() => setIsDiscoverPanelCollapsed((prev) => !prev)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  SearchStyles.discoverToggleText,
                  isDiscoverPanelCollapsed
                    ? SearchStyles.discoverToggleTextCollapsed
                    : SearchStyles.discoverToggleTextExpanded,
                ]}
              >
                {isDiscoverPanelCollapsed
                  ? searchViewStrings.ShowDiscoverPanel
                  : searchViewStrings.HideDiscoverPanel}
              </Text>
              <MaterialIcons
                name={
                  isDiscoverPanelCollapsed
                    ? "keyboard-arrow-down"
                    : "keyboard-arrow-up"
                }
                size={22}
                style={[
                  SearchStyles.discoverToggleIcon,
                  isDiscoverPanelCollapsed
                    ? SearchStyles.discoverToggleIconCollapsed
                    : SearchStyles.discoverToggleIconExpanded,
                ]}
              />
            </TouchableOpacity>
          </View>

          {!isDiscoverPanelCollapsed && (
            <View style={SearchStyles.genreSection}>
              <TouchableOpacity
                style={SearchStyles.genreHeader}
                onPress={() => setIsGenreSectionOpen((prev) => !prev)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={SearchStyles.genreTitle}>
                    {searchViewStrings.BrowseByCategory}
                  </Text>
                  <Text style={SearchStyles.genreSubtitle}>
                    {searchViewStrings.SelectTypeAndGenre}
                  </Text>
                </View>
                <MaterialIcons
                  name={
                    isGenreSectionOpen
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={26}
                  style={SearchStyles.genreHeaderIcon}
                />
              </TouchableOpacity>

              {isGenreSectionOpen && (
                <>
                  <View style={SearchStyles.toggleRow}>
                    {["both", "movie", "tv"].map((filter) => (
                      <TouchableOpacity
                        key={filter}
                        style={[
                          SearchStyles.toggleBtn,
                          mediaFilter === filter &&
                            SearchStyles.toggleBtnActive,
                        ]}
                        onPress={() => {
                          setMediaFilter(filter);
                        }}
                      >
                        <Text
                          style={[
                            SearchStyles.toggleText,
                            mediaFilter === filter &&
                              SearchStyles.toggleTextActive,
                          ]}
                        >
                          {filter === "both"
                            ? searchViewStrings.FilterAll
                            : filter === "movie"
                              ? searchViewStrings.FilterMovies
                              : searchViewStrings.FilterSeries}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={SearchStyles.chipsRow}
                    contentContainerStyle={SearchStyles.chipsContent}
                  >
                    {DISCOVERY_GENRES.map((genre) => (
                      <TouchableOpacity
                        key={genre.key}
                        style={[
                          SearchStyles.chip,
                          selectedGenre === genre.movieId &&
                            SearchStyles.chipActive,
                        ]}
                        onPress={() => {
                          const newGenre =
                            selectedGenre === genre.movieId
                              ? null
                              : genre.movieId;
                          setSelectedGenre(newGenre);
                          if (!newGenre) setResult([]);
                        }}
                      >
                        <Text
                          style={[
                            SearchStyles.chipText,
                            selectedGenre === genre.movieId &&
                              SearchStyles.chipTextActive,
                          ]}
                        >
                          {searchViewStrings.Genres[genre.key]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          )}
        </>
      )}

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={results}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          removeClippedSubviews={true}
          keyExtractor={(item, index) =>
            `${item.media_type || "unknown"}-${item.id || index}`
          }
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                if (item.media_type === "movie") {
                  navigation.push("Movie", item);
                } else if (item.media_type === "tv") {
                  navigation.push("SeriesDetails", item);
                } else if (item.media_type === "person") {
                  navigation.push("Person", item);
                }
              }}
            >
              <View>
                <Image
                  style={SearchStyles.image}
                  source={{
                    uri:
                      item.media_type === "person"
                        ? image185(item?.profile_path) || fallbackMoviePoster
                        : image185(item?.poster_path) || fallbackMoviePoster,
                  }}
                  onLoadStart={() =>
                    setLoadingImages({ ...loadingImages, [item.id]: true })
                  }
                  onLoadEnd={() =>
                    setLoadingImages({ ...loadingImages, [item.id]: false })
                  }
                  progressiveRenderingEnabled={true}
                />
                <Text style={SearchStyles.otherText}>
                  {item?.title || item?.name
                    ? (item.title || item.name).length > 22
                      ? `${(item.title || item.name).slice(0, 22)}...`
                      : item.title || item.name
                    : "No Title"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          ListHeaderComponent={() => (
            <Text style={SearchStyles.resultText}>
              {strings.Navigation.Result} ({results.length})
            </Text>
          )}
          contentContainerStyle={SearchStyles.searchImage}
          numColumns={2}
        />
      )}
    </View>
  );
}
