import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../Colors/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchWatchProviders,
  image500,
  fallbackMoviePoster,
} from "../Api/ApiParsing";
import Cast from "../components/Cast";
import WatchProviders from "../components/WatchProviders";

const { width, height } = Dimensions.get("window");

/**
 * show the movie screen with all the data.
 *
 * @returns MovieScreen
 */
export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getWatchProviders(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data?.cast) setCast(data.cast);
  };

  const getWatchProviders = async (id) => {
    const data = await fetchWatchProviders(id);

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
    <View>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[0]}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <View style={styles.scorl}>
              <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons
                    size={38}
                    name="arrow-back"
                    color={Colors.white}
                  />
                </TouchableOpacity>

                <View style={styles.images}>
                  <Image
                    style={styles.insideImage}
                    source={{
                      uri: image500(movie?.poster_path) || fallbackMoviePoster,
                      loading: "lazy",
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.titletext}>{movie?.title}</Text>
                {movie?.id ? (
                  <Text style={styles.textStatus}>
                    {movie?.status} • {movie?.release_date?.split("-")[0]} •
                    {movie?.runtime} min
                  </Text>
                ) : null}
              </View>

              {/* genres  */}
              <View style={styles.genre}>
                {movie?.genres?.map((genre, index) => {
                  const dot = index + 1 !== movie.genres.length;
                  return (
                    <Text key={genre.id} style={styles.textStatus}>
                      {genre?.name} {dot ? "•" : null}
                    </Text>
                  );
                })}
              </View>
              {/* decription text */}
              <View style={styles.decsription}>
                <Text style={styles.descriptionText}>{movie?.overview}</Text>
              </View>
              {/* cast */}
              <Cast navigation={navigation} cast={cast} />
              {/* watch providers */}
              <WatchProviders providers={watchProviders} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scorl: {
    flex: 1,
    padding: 50,
    paddingTop: 30,
    backgroundColor: Colors.backcolor,
    marginLeft: -40,
    marginRight: -40,
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
  titletext: {
    fontSize: 25,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  genre: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  descriptionText: {
    margin: 3,
    fontSize: 15,
    color: Colors.status,
    textAlign: "left",
  },
});
