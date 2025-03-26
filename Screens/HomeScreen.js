import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Colors from "../Colors/Colors";
import UpcomingMovies from "../components/UpcomingMovies";
import MovieList from "../components/MovieList";
import {
  fetchTrending,
  fetchUpcoming,
  fetchRated,
  fetchNowPlaying,
} from "../Api/ApiParsing";
import Loading from "../components/Loading";
/**
 * show the homescreen with all the data.
 *
 * @returns HomeScreen
 */
function HomeScreen() {
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setRated] = useState([]);
  const [nowPlaying, setPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingMovies();
    getTrendingMovies();
    getRatedMovies();
    getNowPlaying();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetchUpcoming();

    if (data?.results) setUpcoming(data.results);
    setLoading(false);
  };

  const getTrendingMovies = async () => {
    const data = await fetchTrending();

    if (data?.results) setTrending(data.results);
  };

  const getRatedMovies = async () => {
    const data = await fetchRated();
    if (data?.results) setRated(data.results);
  };

  const getNowPlaying = async () => {
    const data = await fetchNowPlaying();
    if (data?.results) setPlaying(data.results);
  };

  // returns homescreen all data.
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          initialNumToRender={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={[
            {
              /* upcoming movies */
            },
            { key: "upcoming", data: upcoming },
            {
              /* now playing cinemas */
            },
            {
              key: "Now Playing cinemas",
              title: "Now playing cinemas",
              data: nowPlaying,
            },
            {
              /* trending movies */
            },
            { key: "trending", title: "Trending Movies", data: trending },
            {
              /* Top rated movies */
            },
            { key: "topRated", title: "Top rated", data: topRated },
          ]}
          renderItem={({ item }) =>
            item.key === "upcoming" ? (
              <UpcomingMovies data={item.data} />
            ) : (
              <MovieList title={item.title} data={item.data} />
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});

export default HomeScreen;
