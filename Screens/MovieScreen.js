import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  image500,
} from "../Api/ApiParsing";
import Cast from "../components/Cast";

var { width, height } = Dimensions.get("window");

//Movie details screens
export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };
  //returns details info
  return (
    <FlatList
      data={[0]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={styles.scorl}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons size={38} name="arrow-back" color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.images}>
              {loading ? (
                <Loading />
              ) : (
                <Image
                  style={{
                    width,
                    height: height * 0.48,
                    borderRadius: 20,
                  }}
                  source={{
                    uri: image500(movie?.poster_path),
                    loading: "lazy",
                  }}
                />
              )}
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            {/* Title */}
            <Text style={styles.titletext}>{movie?.title}</Text>

            {/* status, release , runtime */}
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
              let dot = index + 1 !== movie.genres.length;
              return (
                <Text key={index} style={styles.textStatus}>
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
        </View>
      )}
    />
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
