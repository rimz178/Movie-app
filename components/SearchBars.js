import React, { useCallback, useState } from "react";
import {
  TextInput,
  View,
  FlatList,
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
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SearchStyles } from "../Styles/SearchStyles";
import { useLanguage } from "../localication/LanguageContext";
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
  const { strings } = useLanguage();

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);

      requestAnimationFrame(async () => {
        try {
          const pageSize = "5";

          const [moviesData, seriesData, peopleData] = await Promise.all([
            searchMovies({
              query: value,
              include_adult: "false",
              language: "en-US",
              page: "1",
              per_page: pageSize,
            }),
            searchSeries({
              query: value,
              include_adult: "false",
              language: "en-US",
              page: "1",
              per_page: pageSize,
            }),
            searchPeople({
              query: value,
              include_adult: "false",
              language: "en-US",
              page: "1",
              per_page: pageSize,
            }),
          ]);

          const results = [
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
          const sortedResults = results.sort((a, b) => {
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

          const maxResults = 50;
          setResult(sortedResults.slice(0, maxResults));
        } catch (error) {
          logger.error("Error fetching search results:", error);
          setResult([]);
        } finally {
          setLoading(false);
        }
      });
    } else if (value.length === 0) {
      setResult([]);
      setLoading(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View style={SearchStyles.container}>
      <View style={SearchStyles.search}>
        <TextInput
          style={SearchStyles.textinput}
          placeholder={strings.Navigation.Search}
          onChangeText={handleTextDebounce}
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons style={SearchStyles.icon} size={38} name="close" />
        </TouchableOpacity>
      </View>

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
