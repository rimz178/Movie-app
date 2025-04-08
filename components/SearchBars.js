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

import { debounce } from "lodash";
import Loading from "./Loading";
import {
  image185,
  searchMovies,
  searchSeries,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../Colors/Colors";

const { width, height } = Dimensions.get("window");
/**
 * SearchBars component for searching movies and series.
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
        const [moviesData, seriesData] = await Promise.all([
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
        ];
        setResult(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
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
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.textinput}
          placeholder="Search"
          onChangeText={handleTextDebounce}
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons style={styles.icon} size={38} name="close" />
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
                }
              }}
            >
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: image185(item?.poster_path) || fallbackMoviePoster,
                  }}
                />
                <Text style={styles.otherText}>
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
            <Text style={styles.resultText}>Result ({results.length})</Text>
          )}
          contentContainerStyle={styles.searchImage}
          numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  search: {
    backgroundColor: Colors.backcolor,
    marginHorizontal: 40,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.searchColor,
    width: "80%",
  },

  textinput: {
    fontSize: 20,
    padding: 10,
    marginLeft: 5,
    width: "90%",
    color: "white",
  },
  icon: {
    marginRight: 10,
    color: Colors.searchColor,
  },
  scorll: {
    flex: 1,
  },
  resultText: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 20,
  },
  otherText: {
    color: Colors.white,
  },
  image: {
    width: (width - 60) / 2,
    height: ((width - 60) / 2) * 1.5,
    margin: 2,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
  },
  searchImage: {
    paddingHorizontal: 10,
  },
});
