import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../Colors/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomRating from "../components/CustomRating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchWatchProviders,
  image500,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import Cast from "../components/Cast";
import WatchProviders from "../components/WatchProviders";
import { toggleFavorite, fetchFavorites } from "../Api/Favorites";

const { width, height } = Dimensions.get("window");

/**
 * Displays detailed information about a movie, including its cast, genres, and watch providers.
 *
 * @param {object} route - Contains the parameters passed to this screen, such as the movie ID.
 * @param {object} navigation - Navigation object for navigating between screens.
 * @returns {JSX.Element} - The movie details screen.
 */
export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userSessionId, setUserSessionId] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getWatchProviders(item.id);
    fetchFavoriteStatus(item.id);
    fetchUserSessionId();
  }, [item]);

  const fetchUserSessionId = async () => {
    try {
      const sessionId = await AsyncStorage.getItem("session_id");
      if (sessionId) {
        setUserSessionId(sessionId);
      }
    } catch (error) {
      console.error("Error fetching session ID:", error);
    }
  };
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data?.cast) setCast(data.cast);
  };

  const getWatchProviders = async (id) => {
    const data = await fetchWatchProviders(id);

    if (data?.results) {
      const countryCode = "FI";
      const providersForCountry = data.results[countryCode] || {};

      const providersArray = [
        ...(providersForCountry.flatrate || []),
        ...(providersForCountry.buy || []),
        ...(providersForCountry.rent || []),
      ];

      setWatchProviders(providersArray);
    }
  };

  const fetchFavoriteStatus = async (movieId) => {
    try {
      const favorites = await fetchFavorites();
      const isMovieFavorite =
        favorites.movies?.some((favorite) => favorite.id === movieId) || false;
      setIsFavorite(isMovieFavorite);
    } catch (error) {
      console.error("Error fetching favorite status:", error);
    }
  };
  const handleToggleFavorite = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      const response = await toggleFavorite(
        movie.id,
        newFavoriteStatus,
        "movie",
      );
      Alert.alert(
        "Favorites",
        newFavoriteStatus
          ? `${movie.title} has been added to your favorites!`
          : `${movie.title} has been removed from your favorites!`,
      );
      if (response.success) {
        setIsFavorite(newFavoriteStatus);
      } else {
        console.error("Failed to toggle favorite:", response);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[0]}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <View style={styles.content}>
              <View style={styles.images}>
                <Image
                  style={styles.insideImage}
                  source={{
                    uri: image500(movie?.poster_path) || fallbackMoviePoster,
                    loading: "lazy",
                  }}
                />
                <TouchableOpacity
                  onPress={handleToggleFavorite}
                  style={styles.favoriteButton}
                >
                  <MaterialIcons
                    name={isFavorite ? "favorite" : "favorite-border"}
                    size={30}
                    color={isFavorite ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                <CustomRating
                  movieId={movie.id}
                  sessionId={userSessionId}
                  type="movie"
                />
                <Text style={styles.titletext}>{movie?.title}</Text>
                {movie?.id ? (
                  <Text style={styles.textStatus}>
                    {movie?.status} • {movie?.release_date?.split("-")[0]} •
                    {movie?.runtime} min
                  </Text>
                ) : null}
              </View>

              <View style={styles.genre}>
                {movie?.genres?.map((genre, index) => {
                  const dot = index + 1 !== movie.genres.length;
                  return (
                    <Text key={genre.id} style={styles.textStatus}>
                      {genre?.name} {dot ? "•" : null}
                    </Text>
                  );
                })}
              </View>

              <Text style={styles.descriptionText}>{movie?.overview}</Text>

              <Cast navigation={navigation} cast={cast} />
              <WatchProviders providers={watchProviders} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  content: {
    padding: 15,
    paddingHorizontal: 20,
  },

  images: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  insideImage: {
    width: width * 0.97,
    height: height * 0.48,
    borderRadius: 20,
  },
  titletext: {
    fontSize: 25,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  genre: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  descriptionText: {
    margin: 3,
    fontSize: 15,
    color: Colors.status,
    textAlign: "left",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.black,
    padding: 5,
    borderRadius: 15,
  },
});
