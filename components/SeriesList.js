import React, { useCallback, useState } from "react";
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
 * SeriesList component that displays a horizontal list of TV series.
 *
 * @param {string} title - The title of the series list.
 * @param {Array} data - Array of series objects to display.
 * @param {number} listIndex - Index to differentiate between multiple lists
 */
export default function SeriesList({ title, data, listIndex }) {
  const navigation = useNavigation();
  const [loadingImages, setLoadingImages] = useState({});

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
            onLoadStart={() =>
              setLoadingImages({ ...loadingImages, [item.id]: true })
            }
            onLoadEnd={() =>
              setLoadingImages({ ...loadingImages, [item.id]: false })
            }
            progressiveRenderingEnabled={true}
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
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
}
