import React, { useEffect, useState } from "react";
import {
  View,
  Text,
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
} from "../Api/ApiParsing";
import Colors from "../Colors/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import WatchProviders from "../components/WatchProviders";

export default function SeriesDetailScreen() {
  const { params: series } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [seriesDetails, setSeriesDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);

  useEffect(() => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[0]}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.content}>
            <Image
              style={styles.image}
              source={{
                uri: image500(seriesDetails?.poster_path),
                loading: "lazy",
              }}
            />
            <Text style={styles.title}>{seriesDetails?.name}</Text>
            <Text style={styles.overview}>{seriesDetails?.overview}</Text>

            <Cast navigation={navigation} cast={cast}/>
            <WatchProviders providers={watchProviders} />
          </View>
        )}
      />
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
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginVertical: 10,
    textAlign: "center",
  },
  overview: {
    fontSize: 16,
    color: Colors.status,
    lineHeight: 24,
    marginBottom: 15,
  },
});