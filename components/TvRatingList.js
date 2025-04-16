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
import { getRatedTvShows } from "../Api/RatingApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Colors/Colors";

const TvRatingList = () => {
  const [ratedTvShows, setRatedTvShows] = useState([]);
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

    const fetchRatedTvShows = async () => {
      try {
        const tvShows = await getRatedTvShows(sessionId);
        setRatedTvShows(tvShows || []);
      } catch (err) {
        console.error("Error fetching rated TV shows:", err);
        setError("Failed to fetch rated TV shows. Please try again later.");
      }
    };

    fetchRatedTvShows();
  }, [sessionId]);

  const handleTvPress = (tvShow) => {
    navigation.navigate("SeriesDetails", tvShow);
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (ratedTvShows.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No rated TV shows</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.titleText}>Rated Tv-series</Text>
      <FlatList
        data={ratedTvShows}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleTvPress(item)}>
            <View style={styles.card}>
              <Image
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={styles.poster}
                resizeMode="cover"
              />
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
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

export default TvRatingList;
