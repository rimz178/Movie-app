import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { logger } from '../utils/logger';
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
/**
 * SearchBars component for searching movies, series and actors.
 *
 * @returns {JSX.Element} - The search bar and results list.
 */
export default function SearchBars() {
  const navigation = useNavigation();
  const [results, setResult] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);

      try {
        const [moviesData, seriesData, peopleData] = await Promise.all([
          searchMovies({
            query: value,
            include_adult: "false",
            language: "en-US",
            page: "1",
          }),
          searchSeries({
            query: value,
            include_adult: "false",
            language: "en-US",
            page: "1",
          }),
          searchPeople({
            query: value,
            include_adult: "false",
            language: "en-US",
            page: "1",
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

        const sortedResults = results.sort((a, b) => {
          const aTitle = (a.title || a.name || "").toLowerCase();
          const bTitle = (b.title || b.name || "").toLowerCase();
          const searchValue = value.toLowerCase();

          const aExactMatch = aTitle === searchValue ? 1 : 0;
          const bExactMatch = bTitle === searchValue ? 1 : 0;

          if (aExactMatch !== bExactMatch) {
            return bExactMatch - aExactMatch;
          }

          const aIncludes = aTitle.includes(searchValue) ? 1 : 0;
          const bIncludes = bTitle.includes(searchValue) ? 1 : 0;

          if (aIncludes !== bIncludes) {
            return bIncludes - aIncludes;
          }
          return (b.popularity || 0) - (a.popularity || 0);
        });

        setResult(sortedResults);
      } catch (error) {
        logger.error("Error fetching search results:", error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View style={SearchStyles.container}>
      <View style={SearchStyles.search}>
        <TextInput
          style={SearchStyles.textinput}
          placeholder="Search"
          onChangeText={handleTextDebounce}
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons style={SearchStyles.icon} size={38} name="close" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={results}
          initialNumToRender={2}
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
              Result ({results.length})
            </Text>
          )}
          contentContainerStyle={SearchStyles.searchImage}
          numColumns={2}
        />
      )}
    </View>
  );
}
