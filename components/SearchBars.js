import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";

import { debounce } from "lodash";
import Loading from "./Loading";
import { image185, searchMovies, fallbackMoviePoster } from "../Api/ApiParsing";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../Colors/Colors";

const { width, height } = Dimensions.get("window");

export default function SearchBars() {
  const navigation = useNavigation();
  const [results, setResult] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true)
        searchMovies({
          query: value,
          include_adult: "false",
          language: "en-US",
          page: "1",
        }).then((data) => {
          setLoading(false);
          /* console.log("gota movies ", data); */
          if (data?.results) setResult(data.results);
        });
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        {/* search input */}
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
      {/* search results */}
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={results}
          initialNumToRender={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.push("Movie", item)}
            >
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: image185(item?.poster_path) || fallbackMoviePoster,
                  }}
                />
                <Text style={styles.otherText}>
                  {item?.title && item.title.length > 22
                    ? `${item.title.slice(0, 22)}...`
                    : item?.title}
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
    color: Colors.white,
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
  },
  searchImage: {
    paddingHorizontal: 10,
  },
});
