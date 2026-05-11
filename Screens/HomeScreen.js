import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../Styles/GlobalStyles";
import UpcomingMovies from "../components/UpcomingMovies";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import {
  fetchTrending,
  fetchUpcoming,
  fetchRated,
  fetchNowPlaying,
} from "../Api/ApiParsing";
import { useLanguage } from "../localization/LanguageContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { logger } from "../utils/logger";
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
  const { strings, language } = useLanguage();

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
            fetchUpcoming(language),
            fetchTrending(language),
            fetchRated(language),
            fetchNowPlaying(language),
          ]);

        if (upcomingData?.results) setUpcoming(upcomingData.results);
        if (trendingData?.results) setTrending(trendingData.results);
        if (ratedData?.results) setRated(ratedData.results);
        if (nowPlayingData?.results) setPlaying(nowPlayingData.results);

        setLoading(false);
      } catch {
        setLoading(false);
        logger.error("Failed to load movie home data.");
      }
    };

    fetchAllData();
  }, [route, language]);

  useEffect(() => {
    const checkAndAskForReview = async () => {
      try {
        const LAUNCH_COUNT_KEY = "app_launch_count";
        const REVIEW_SHOWN_KEY = "review_shown";
        let count = Number(
          (await AsyncStorage.getItem(LAUNCH_COUNT_KEY)) || "0",
          10,
        );
        const reviewShown = await AsyncStorage.getItem(REVIEW_SHOWN_KEY);

        if (!reviewShown) {
          count += 1;
          await AsyncStorage.setItem(LAUNCH_COUNT_KEY, count.toString());

          if (count === 5 && (await StoreReview.isAvailableAsync())) {
            StoreReview.requestReview();
            await AsyncStorage.setItem(REVIEW_SHOWN_KEY, "true");
          }
        }
      } catch {}
    };
    checkAndAskForReview();
  }, []);

  return (
    <SafeAreaProvider style={GlobalStyles.container}>
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
            ListFooterComponent={() => (
              <View style={GlobalStyles.recommendationTeaserWrap}>
                <View style={GlobalStyles.recommendationTeaserCard}>
                  <Text style={GlobalStyles.recommendationTeaserEyebrow}>
                    {strings.WhatToWatch.QuickPick}
                  </Text>
                  <Text style={GlobalStyles.recommendationTeaserTitle}>
                    {strings.WhatToWatch.Title}
                  </Text>
                  <Text style={GlobalStyles.recommendationTeaserText}>
                    {strings.WhatToWatch.SearchCardText}
                  </Text>
                  <TouchableOpacity
                    style={GlobalStyles.recommendationTeaserButton}
                    onPress={() => navigation.navigate("WhatToWatch")}
                  >
                    <Text style={GlobalStyles.recommendationTeaserButtonText}>
                      {strings.WhatToWatch.OpenButton}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaProvider>
  );
}

export default HomeScreen;
