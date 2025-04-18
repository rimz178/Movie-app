import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { fetchFavorites } from "../Api/Favorites";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Styles/Colors";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.33;
/**
 * This component fetches and displays a list of favorite movies and TV shows.
 *
 * @returns  {JSX.Element} A component that displays a list of favorite movies and TV shows.
 */
const FavoritesList = () => {
  const [favorites, setFavorites] = useState({ movies: [], tvShows: [] });
  const [isLoading, setIsLoading] = useState(true);
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
        console.error("Error loading favorites:", error);
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Loading favorites...</Text>
      </View>
    );
  }

  if (
    (!favorites.movies || favorites.movies.length === 0) &&
    (!favorites.tvShows || favorites.tvShows.length === 0)
  ) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet</Text>
      </View>
    );
  }

  return (
    <View>
      {favorites.movies.length > 0 && (
        <>
          <Text style={styles.titleText}>Movie Favorites</Text>
          <FlatList
            data={favorites.movies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleMoviePress(item)}>
                <View style={styles.movieCard}>
                  <Image
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={2}>
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
          <Text style={styles.titleText}>TV Show Favorites</Text>
          <FlatList
            data={favorites.tvShows}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleTVPress(item)}>
                <View style={styles.movieCard}>
                  <Image
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={2}>
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

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    padding: 15,
  },
  movieCard: {
    width: ITEM_WIDTH,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: Colors.darkGray,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: "100%",
    height: height * 0.22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default FavoritesList;
