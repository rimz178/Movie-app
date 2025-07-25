import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { image500, fallbackMoviePoster } from "../Api/ApiParsing";
import { UpcomingStyles } from "../Styles/UpcomingStyles";
import { useLanguage } from "../localization/LanguageContext";

/**
 * UpcomingMovies component that displays a horizontal list of upcoming movies.
 *
 * @param {Array} data - Array of upcoming movie objects.
 * @returns {JSX.Element} - The upcoming movies list.
 */
export default function UpcomingMovies({ data }) {
  const navigation = useNavigation();
  const [loadingImages, setLoadingImages] = useState({});
  const { strings } = useLanguage();

  const handleClick = useCallback(
    (item) => {
      navigation.navigate("Movie", item);
    },
    [navigation],
  );

  return (
    <View>
      <Text style={UpcomingStyles.text}>{strings.Movies.UpcomingMovies}</Text>
      <FlatList
        layout="default"
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Movie
            item={item}
            handleClick={handleClick}
            loadingImages={loadingImages}
            setLoadingImages={setLoadingImages}
          />
        )}
        horizontal
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={true}
        keyExtractor={(item) => `upcoming-${item.id.toString()}`}
      />
    </View>
  );
}

const Movie = ({ item, handleClick, loadingImages, setLoadingImages }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View>
        <Image
          source={{
            uri: image500(item.poster_path) || fallbackMoviePoster,
          }}
          style={UpcomingStyles.itemImg}
          onLoadStart={() =>
            setLoadingImages({ ...loadingImages, [item.id]: true })
          }
          onLoadEnd={() =>
            setLoadingImages({ ...loadingImages, [item.id]: false })
          }
          progressiveRenderingEnabled={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
