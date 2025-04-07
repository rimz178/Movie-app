import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  fetchSeriesDetails,
  fetchSeriesCredits,
  fetchSeriesWatchProviders,
  image500,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import Colors from "../Colors/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import WatchProviders from "../components/WatchProviders";
const { width, height } = Dimensions.get("window");
/**
 * Displays detailed information about a series, including its cast, genres, and watch providers.
 *
 * @returns {JSX.Element} - The series details screen.
 */
export default function SeriesDetailScreen() {
  const { params: series } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [seriesDetails, setSeriesDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);

  useEffect(() => {
    setLoading(true);
    getSeriesDetails(series.id);
    getSeriesCredits(series.id);
    getSeriesWatchProviders(series.id);
  }, [series.id]);

  const getSeriesDetails = async (id) => {
    const data = await fetchSeriesDetails(id);
    if (data) setSeriesDetails(data);
    setLoading(false);
  };

  const getSeriesCredits = async (id) => {
    const data = await fetchSeriesCredits(id);
    if (data?.cast) setCast(data.cast);
  };

  const getSeriesWatchProviders = async (id) => {
    const data = await fetchSeriesWatchProviders(id);
    if (data?.results) {
      const countryCode = "FI";
      const providersForCountry = data.results[countryCode] || {};

      const providersArray = [
        ...(providersForCountry.flatrate || []),
        ...(providersForCountry.buy || []),
        ...(providersForCountry.rent || []),
      ];

      setWatchProviders(providersArray);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[0]}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <View style={styles.content}>
              <View style={styles.images}>
                <Image
                  style={styles.insideImage}
                  source={{
                    uri:
                      image500(seriesDetails?.backdrop_path) ||
                      fallbackMoviePoster,
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.title}>{seriesDetails?.name}</Text>
                {series?.id ? (
                  <Text style={styles.textStatus}>
                    {seriesDetails?.status} •{" "}
                    {seriesDetails?.first_air_date?.split("-")[0]} •
                    {seriesDetails?.number_of_seasons} Seasons •{" "}
                    {seriesDetails?.number_of_episodes} Episodes
                  </Text>
                ) : null}
              </View>
              <View style={styles.genre}>
                {seriesDetails?.genres?.map((genre) => (
                  <Text key={genre.id} style={styles.textStatus}>
                    {genre?.name}
                  </Text>
                ))}
              </View>
              <View>
                <Text style={styles.descriptionText}>
                  {seriesDetails?.overview}
                </Text>
                <Cast navigation={navigation} cast={cast} />
                <WatchProviders providers={watchProviders} />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
  content: {
    padding: 15,
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginVertical: 10,
    textAlign: "center",
  },
  descriptionText: {
    margin: 3,
    fontSize: 15,
    color: Colors.status,
    textAlign: "left",
  },
  genre: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  images: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  insideImage: {
    width: width * 0.97,
    height: height * 0.48,
    borderRadius: 20,
  },
});
