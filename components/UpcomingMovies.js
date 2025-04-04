import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback } from "react";
import Colors from "../Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { image500, fallbackMoviePoster } from "../Api/ApiParsing";

const { width, height } = Dimensions.get("window");

/**
 * UpcomingMovies component that displays a horizontal list of upcoming movies.
 *
 * @param {Array} data - Array of upcoming movie objects.
 * @returns {JSX.Element} - The upcoming movies list.
 */
export default function UpcomingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = useCallback(
    (item) => {
      navigation.navigate("Movie", item);
    },
    [navigation],
  );

  return (
    <View>
      <Text style={styles.text}>Upcoming Movies</Text>
      <FlatList
        layout="default"
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Movie item={item} handleClick={handleClick} />
        )}
        horizontal
        initialNumToRender={2}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const Movie = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: image500(item.poster_path) || fallbackMoviePoster,
          loading: "lazy",
        }}
        style={styles.itemImg}
      />
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  itemImg: {
    margin: 5,
    padding: 5,
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
    padding: 20,
  },
});
