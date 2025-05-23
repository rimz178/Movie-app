import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
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
export default function SeriesList({ title, data, listIndex }) {
  const navigation = useNavigation();

  const handleClick = useCallback(
    (item) => {
      navigation.navigate("SeriesDetails", item);
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
            }}
          />
          <Text style={ListStyles.text}>
            {item?.name && item.name.length > 14
              ? `${item.name.slice(0, 14)}...`
              : item?.name}
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
        keyExtractor={(item, index) =>
          `list-${listIndex}-${title}-${item.id}-${index}`
        }
        renderItem={renderItem}
        initialNumToRender={2}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
}
