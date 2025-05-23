import React, { useEffect, useState } from "react";
import { FlatList, Text, SafeAreaView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../Styles/GlobalStyles";
import UpcomingMovies from "../components/UpcomingMovies";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SegmentedTabs from "../stack/SegmentedTabs";
import {
  fetchTrending,
  fetchUpcoming,
  fetchRated,
  fetchNowPlaying,
} from "../Api/ApiParsing";

/**
 * HomeScreen component that displays movie data.
 *
 * @param {object} route - Contains parameters passed to this screen.
 * @returns {JSX.Element} - The home screen.
 */
function HomeScreen({ route }) {
  const navigation = useNavigation();
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setRated] = useState([]);
  const [nowPlaying, setPlaying] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [selectedTab, setSelectedTab] = useState("movies");

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    if (newValue === "series") {
      navigation.navigate("Series");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      setSelectedTab("movies");
    }, []),
  );

  useEffect(() => {
    if (route?.params?.isGuest) {
      setIsGuest(true);
    } else {
      AsyncStorage.getItem("session_id").then((sessionId) => {
        if (!sessionId) {
          setIsGuest(true);
        }
      });
    }
    getUpcomingMovies();
    getTrendingMovies();
    getRatedMovies();
    getNowPlaying();
  }, [route]);

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

  return (
    <SafeAreaView style={GlobalStyles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isGuest && (
            <Text style={GlobalStyles.guestText}>
              Welcome, Guest! Log in to access more features like favorites.
            </Text>
          )}
          <SegmentedTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          <FlatList
            initialNumToRender={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={[
              { key: "upcoming", data: upcoming },
              {
                key: "Now Playing cinemas",
                title: "Now playing cinemas",
                data: nowPlaying,
              },
              { key: "trending", title: "Trending Movies", data: trending },
              { key: "topRated", title: "Top rated", data: topRated },
            ]}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) =>
              item.key === "upcoming" ? (
                <UpcomingMovies data={item.data} />
              ) : (
                <MovieList title={item.title} data={item.data} />
              )
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
