import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Colors from "../Colors/Colors";
import UpcomingMovies from "../components/UpcomingMovies";
import { ScrollView } from "react-native-gesture-handler";
import MovieList from "../components/MovieList";
import { fetchTrending, fetchUpcoming, fetchRated } from "../Api/ApiParsing";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [trending, setTrending] = useState([1, 2, 3]);
  const [topRated, setRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getUpcomingMovies();
    getTrendingMovies();
    getRatedMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetchUpcoming();
    /*  console.log("got upcoming", data.results.length); */
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };
  const getTrendingMovies = async () => {
    const data = await fetchTrending();
    /*  console.log("got trending", data.results); */
    if (data && data.results) setTrending(data.results);
  };
  const getRatedMovies = async () => {
    const data = await fetchRated();
    /*  console.log("got rated", data.results); */
    if (data && data.results) setRated(data.results);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          {/* upcoming movies */}
          {upcoming.length > 0 && <UpcomingMovies data={upcoming} />}
          {/* trending movies */}
          <MovieList title="Trending Movies" data={trending} />
          {/* Top rated movies */}
          <MovieList title="Top rated" data={topRated} />
        </ScrollView>
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
