import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import  { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { image500, fallbackMoviePoster } from "../Api/ApiParsing";
import { UpcomingStyles } from "../Styles/UpcomingStyles";

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
      <Text style={UpcomingStyles.text}>Upcoming Movies</Text>
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
        keyExtractor={(item) => `upcoming-${item.id.toString()}`}
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
        style={UpcomingStyles.itemImg}
      />
    </TouchableWithoutFeedback>
  );
};
