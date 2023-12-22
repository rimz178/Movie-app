import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";

import Colors from "../Colors/Colors";
import UpcomingMovies from "../components/UpcomingMovies";
import SearchBar from "../components/SearchBars";
import { ScrollView } from "react-native-gesture-handler";
import MovieList from "../components/MovieList";

function HomeScreen() {
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [trending, setTrending] = useState([1, 2, 3]);
  const [topRated, setRated] = useState([1, 2, 3]);
  const [loading, setLoadin] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <SearchBar />
      </View>
      <ScrollView>
        {/* upcoming movies */}
        <UpcomingMovies data={upcoming} />
        {/* trending movies */}
        <MovieList title="Trending Movies" data={trending} />
        <MovieList title="Top rated" data={trending} />
      </ScrollView>
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
