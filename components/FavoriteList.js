import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { fetchFavorites } from "../Api/Favorites";
import { useNavigation } from "@react-navigation/native";
import { FavoriteStyles } from "../Styles/FavoriteStyles";
import { logger } from "../utils/logger";

/**
 * This component fetches and displays a list of favorite movies and TV shows.
 *
 * @returns  {JSX.Element} A component that displays a list of favorite movies and TV shows.
 */
const FavoriteList = () => {
  const [favorites, setFavorites] = useState({ movies: [], tvShows: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetchFavorites();
        setFavorites({
          movies: response.movies,
          tvShows: response.tvShows,
        });
        setIsLoading(false);
      } catch (error) {
        logger.error("Error loading favorites:", error);
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate("Movie", movie);
  };

  const handleTVPress = (SeriesDetails) => {
    navigation.navigate("SeriesDetails", SeriesDetails);
  };

  if (isLoading) {
    return (
      <View style={FavoriteStyles.emptyContainer}>
        <Text style={FavoriteStyles.emptyText}>Loading favorites...</Text>
      </View>
    );
  }

  if (
    (!favorites.movies || favorites.movies.length === 0) &&
    (!favorites.tvShows || favorites.tvShows.length === 0)
  ) {
    return (
      <View style={FavoriteStyles.emptyContainer}>
        <Text style={FavoriteStyles.emptyText}>No favorites yet</Text>
      </View>
    );
  }

  return (
    <View>
      {favorites.movies.length > 0 && (
        <>
          <Text style={FavoriteStyles.titleText}>Movie Favorites</Text>
          <FlatList
            data={favorites.movies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleMoviePress(item)}>
                <View style={FavoriteStyles.movieCard}>
                  <Image
                    onLoadStart={() =>
                      setLoadingImages({
                        ...loadingImages,
                        [`movie-${item.id}`]: true,
                      })
                    }
                    onLoadEnd={() =>
                      setLoadingImages({
                        ...loadingImages,
                        [`movie-${item.id}`]: false,
                      })
                    }
                    progressiveRenderingEnabled={true}
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={FavoriteStyles.poster}
                    resizeMode="cover"
                  />
                  <View style={FavoriteStyles.infoContainer}>
                    <Text style={FavoriteStyles.title} numberOfLines={2}>
                      {item?.title && item.title.length > 14
                        ? `${item.title.slice(0, 14)}...`
                        : item?.title}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </>
      )}

      {favorites.tvShows.length > 0 && (
        <>
          <Text style={FavoriteStyles.titleText}>TV Show Favorites</Text>
          <FlatList
            data={favorites.tvShows}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleTVPress(item)}>
                <View style={FavoriteStyles.movieCard}>
                  <Image
                    onLoadStart={() =>
                      setLoadingImages({
                        ...loadingImages,
                        [`tv-${item.id}`]: true,
                      })
                    }
                    onLoadEnd={() =>
                      setLoadingImages({
                        ...loadingImages,
                        [`tv-${item.id}`]: false,
                      })
                    }
                    progressiveRenderingEnabled={true}
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={FavoriteStyles.poster}
                    resizeMode="cover"
                  />
                  <View style={FavoriteStyles.infoContainer}>
                    <Text style={FavoriteStyles.title} numberOfLines={2}>
                      {item?.name && item.name.length > 14
                        ? `${item.name.slice(0, 14)}...`
                        : item?.name}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </>
      )}
    </View>
  );
};

export default FavoriteList;
