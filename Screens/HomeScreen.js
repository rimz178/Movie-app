import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../Colors/Colors";
import UpcomingMovies from "../components/UpcomingMovies";
import { ScrollView } from "react-native-gesture-handler";
import MovieList from "../components/MovieList";
import { fetchTrending, fetchUpcoming, fetchRated } from "../Api/ApiParsing";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getUpcomingMovies();
    getTrendingMovies();
    getRatedMovies();
  }, []);

  /*  fetches upcoming movies from the website, 
if the information is found, setload is set to false and imports the information. */
  const getUpcomingMovies = async () => {
    const data = await fetchUpcoming();

    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };
  //same as above, but only searches for trending movies
  const getTrendingMovies = async () => {
    const data = await fetchTrending();

    if (data && data.results) setTrending(data.results);
  };
  //same as above, but only searches for get rated movies
  const getRatedMovies = async () => {
    const data = await fetchRated();
    if (data && data.results) setRated(data.results);
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
