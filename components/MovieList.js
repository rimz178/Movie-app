import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { ListStyles } from "../Styles/ListStyles";
/**
 * MovieList component that displays a horizontal list of movies.
 *
 * @param {string} title - The title of the movie list.
 * @param {Array} data - Array of movie objects to display.
 */
export default function MovieList({ title, data }) {
  const navigation = useNavigation();

  const handleClick = useCallback(
    (item) => {
      navigation.navigate("Movie", item);
    },
    [navigation],
  );

  const renderItem = ({ item }) => (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View>
          <Image
            style={ListStyles.image}
            source={{
              uri: image185(item.poster_path) || fallbackMoviePoster,
              loading: "lazy",
            }}
          />
          <Text style={ListStyles.text}>
            {item?.title && item.title.length > 14
              ? `${item.title.slice(0, 14)}...`
              : item?.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View>
      <View>
        <Text style={ListStyles.titleText}>{title}</Text>
      </View>
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={2}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
}
