import React, { useEffect, useState } from "react";
import { FlatList, Text, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../Styles/GlobalStyles";
import UpcomingMovies from "../components/UpcomingMovies";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  fetchTrending,
  fetchUpcoming,
  fetchRated,
  fetchNowPlaying,
} from "../Api/ApiParsing";
import { useLanguage } from "../localization/LanguageContext";
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
  const { strings } = useLanguage();

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
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [upcomingData, trendingData, ratedData, nowPlayingData] =
          await Promise.all([
            fetchUpcoming(),
            fetchTrending(),
            fetchRated(),
            fetchNowPlaying(),
          ]);

        if (upcomingData?.results) setUpcoming(upcomingData.results);
        if (trendingData?.results) setTrending(trendingData.results);
        if (ratedData?.results) setRated(ratedData.results);
        if (nowPlayingData?.results) setPlaying(nowPlayingData.results);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage("Failed to load data. Please try again later.");
      }
    };

    fetchAllData();
  }, [route]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isGuest && (
            <Text style={GlobalStyles.guestText}>
              {strings.Header.WelcomeGuestLog}
            </Text>
          )}
          <FlatList
            initialNumToRender={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={[
              { key: "upcoming", data: upcoming },
              {
                key: "Now Playing cinemas",
                title: strings.Movies.NowPlaying,
                data: nowPlaying,
              },
              {
                key: "trending",
                title: strings.Movies.TrendingMovies,
                data: trending,
              },
              {
                key: "topRated",
                title: strings.Movies.TopRated,
                data: topRated,
              },
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
