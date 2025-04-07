import React, { useEffect, useState } from "react";
import Colors from "../Colors/Colors";
import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SeriesList from "../components/SeriesList";
import Loading from "../components/Loading";
import SegmentedTabs from "../stack/SegmentedTabs";
import {
  fetchPopularSeries,
  fetchTopRatedSeries,
  fetchTrendingSeries,
  fetchAiringTodaySeries,
} from "../Api/ApiParsing";

/**
 * SeriesHomeScreen component that displays a list of trending series.
 *
 * @param {object} route - Contains parameters passed to this screen.
 * @returns {JSX.Element} - The series home screen.
 */
function SeriesHomeScreen({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const [onTheAir, setOnTheAir] = useState([]);
  const [popular, setPopular] = useState([]);
  const [selectedTab, setSelectedTab] = useState("series");
  const [isGuest, setIsGuest] = useState(false);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    if (newValue === "movies") {
      navigation.navigate("MainTabs");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      setSelectedTab("series");
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
    getTrendingSeries();
    getTopRatedSeries();
    getOnTheAirSeries();
    getPopularSeries();
  }, [route]);

  const getTrendingSeries = async () => {
    const data = await fetchTrendingSeries();
    if (data?.results) setTrending(data.results);
    setLoading(false);
  };

  const getTopRatedSeries = async () => {
    const data = await fetchTopRatedSeries();
    if (data?.results) setTopRated(data.results);
  };
  const getOnTheAirSeries = async () => {
    const data = await fetchAiringTodaySeries();
    if (data?.results) setOnTheAir(data.results);
  };
  const getPopularSeries = async () => {
    const data = await fetchPopularSeries();
    if (data?.results) setPopular(data.results);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isGuest && (
            <Text style={styles.guestText}>
              Welcome, Guest! Log in to access more features like favorites.
            </Text>
          )}
          <SegmentedTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          <FlatList
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={[
              {
                key: "Trending Series",
                title: "Trending Series",
                data: trending,
              },
              {
                key: "Top Rated Series",
                title: "Top Rated Series",
                data: topRated,
              },
              {
                key: "On The Air Series",
                title: "On The Air Series",
                data: onTheAir,
              },
              {
                key: "Popular Series",
                title: "Popular Series",
                data: popular,
              },
            ]}
            renderItem={({ item }) => (
              <SeriesList title={item.title} data={item.data} />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
    paddingBottom: 60,
  },
  guestText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});
export default SeriesHomeScreen;
