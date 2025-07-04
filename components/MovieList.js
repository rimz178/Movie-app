import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { ListStyles } from "../Styles/ListStyles";
import { CommonStyles } from "../Styles/CommonStyles";

/**
 * MovieList component that displays a horizontal list of movies.
 *
 * @param {string} title - The title of the movie list.
 * @param {Array} data - Array of movie objects to display.
 */
export default function MovieList({ title, data }) {
  const navigation = useNavigation();
  const [loadingImages, setLoadingImages] = useState({});

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
          {loadingImages[item.id] && (
            <ActivityIndicator
              style={CommonStyles.loading}
              size="small"
              color="#E21818"
            />
          )}
          <Image
            style={ListStyles.image}
            onLoadStart={() =>
              setLoadingImages({ ...loadingImages, [item.id]: true })
            }
            onLoadEnd={() =>
              setLoadingImages({ ...loadingImages, [item.id]: false })
            }
            progressiveRenderingEnabled={true}
            source={{
              uri: image185(item.poster_path) || fallbackMoviePoster,
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
        keyExtractor={(item) => `${title}-${item.id.toString()}`}
        renderItem={renderItem}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
}
