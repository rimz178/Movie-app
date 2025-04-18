import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";
import { getRatedMovies } from "../Api/RatingApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Styles/Colors";

/**
 * MovieRatingList component fetches and displays a list of rated movies.
 *
 * @returns {JSX.Element} A component that displays a list of rated movies.
 */
const MovieRatingList = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserSessionId = async () => {
      try {
        const storedSessionId = await AsyncStorage.getItem("session_id");
        if (storedSessionId) {
          setSessionId(storedSessionId);
        } else {
          setError("Session ID is missing. Please log in to view ratings.");
        }
      } catch (err) {
        console.error("Error fetching session ID:", err);
        setError("Failed to fetch session ID. Please try again later.");
      }
    };

    fetchUserSessionId();
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const fetchRatedMovies = async () => {
      try {
        const movies = await getRatedMovies(sessionId);
        setRatedMovies(movies || []);
      } catch (err) {
        console.error("Error fetching movie ratings:", err);
        setError("Failed to fetch movie ratings. Please try again later.");
      }
    };

    fetchRatedMovies();
  }, [sessionId]);

  const handleMoviePress = (movie) => {
    navigation.navigate("Movie", movie);
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (ratedMovies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No rated movies</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.titleText}>Rated Movies</Text>
      <FlatList
        data={ratedMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleMoviePress(item)}>
            <View style={styles.card}>
              <Image
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={styles.poster}
                resizeMode="cover"
              />
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    padding: 15,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 120,
    marginHorizontal: 5,
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
  },
  poster: {
    width: "100%",
    height: 180,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
});

export default MovieRatingList;
