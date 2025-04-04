import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import Colors from "../Colors/Colors";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../Api/ApiParsing";

/**
 * PersonScreen component that displays details about a person, including their biography and movies.
 *
 * @returns {JSX.Element} - The person details screen.
 */
export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data?.cast) setPersonMovies(data.cast);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[0]}
          keyExtractor={(item) => item.toString()}
          initialNumToRender={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <View>
              <View style={styles.person}>
                <View style={styles.imageCircle}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        image342(person?.profile_path) || fallbackPersonImage,
                      loading: "lazy",
                    }}
                  />
                </View>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{person?.name}</Text>
                <Text style={styles.textStatus}>{person?.place_of_birth}</Text>
              </View>
              <View style={styles.cenderContainer}>
                {/* Cender  */}
                <View style={styles.textContainer}>
                  <Text style={styles.cendreText}>Gender</Text>
                  <Text style={styles.cendres}>
                    {person?.gender === 1 ? "female" : "Male"}
                  </Text>
                </View>
                {/* Birthday */}
                <Divider style={styles.divider} />
                <View style={styles.textContainer}>
                  <Text style={styles.cendreText}>Birthday</Text>
                  <Text style={styles.cendres}>{person?.birthday}</Text>
                </View>
                {/*Know for*/}
                <Divider style={styles.divider} />
                <View style={styles.textContainer}>
                  <Text style={styles.cendreText}>Known for</Text>
                  <Text style={styles.cendres}>
                    {person?.known_for_department}
                  </Text>
                </View>
                {/* Popularity */}
                <Divider style={styles.divider} />
                <View style={styles.textContainer}>
                  <Text style={styles.cendreText}>Popularity</Text>
                  <Text style={styles.cendres}>
                    {person?.popularity?.toFixed(2)}%
                  </Text>
                </View>
                <Divider style={styles.divider} />
              </View>
              <View style={styles.bioGraphyContainter}>
                <Text style={styles.bioGraphyTitle}>Biography</Text>
                <Text style={styles.bioGraphyText}>
                  {person?.biography || "N/A"}
                </Text>
              </View>
              {/* Person movies */}
              {<MovieList title={"Movies"} data={personMovies} />}
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
    padding: 50,
    paddingTop: 30,
    backgroundColor: Colors.backcolor,
    marginLeft: -40,
    marginRight: -40,
  },
  person: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },

  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (height * 0.3) / 2,
    overflow: "hidden",
  },

  image: {
    height: height * 0.3,
    width: width * 0.63,
    resizeMode: "cover",
    borderRadius: (height * 0.3) / 2,
  },
  titleContainer: {
    alignItems: "center",
    padding: 10,
  },

  title: {
    fontSize: 25,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  cenderContainer: {
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: Colors.searchColor,
    borderRadius: 25,
    padding: 20,
  },

  divider: {
    height: "100%",
    width: 1,
    marginRight: 10,
  },
  textContainer: {
    marginRight: 5,
  },
  cendreText: {
    marginRight: 10,
    marginStart: 5,
    fontSize: 15,
    textAlign: "justify",
    color: Colors.white,
    fontWeight: "600",
  },

  cendres: {
    marginStart: 5,
    fontSize: 13,
    color: Colors.status,
  },
  bioGraphyContainter: {
    flexDirection: "column",
    fontWeight: "600",
    marginStart: 5,
    marginTop: 30,
  },
  bioGraphyTitle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
  },
  bioGraphyText: {
    fontSize: 15,
    margin: 3,
    color: Colors.white,
    fontWeight: "200",
    marginTop: 10,
  },
});
