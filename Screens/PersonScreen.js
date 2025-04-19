import { View, Text, SafeAreaView, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../Api/ApiParsing";
import { PersonStyles } from "../Styles/PersonStyles";
/**
 * PersonScreen component that displays details about a person, including their biography and movies.
 *
 * @returns {JSX.Element} - The person details screen.
 */
export default function PersonScreen() {
  const { params: item } = useRoute();
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
    <SafeAreaView style={PersonStyles.container}>
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
              <View style={PersonStyles.person}>
                <View style={PersonStyles.imageCircle}>
                  <Image
                    style={PersonStyles.image}
                    source={{
                      uri:
                        image342(person?.profile_path) || fallbackPersonImage,
                      loading: "lazy",
                    }}
                  />
                </View>
              </View>
              <View style={PersonStyles.titleContainer}>
                <Text style={PersonStyles.title}>{person?.name}</Text>
                <Text style={PersonStyles.textStatus}>
                  {person?.place_of_birth}
                </Text>
              </View>
              <View style={PersonStyles.cenderContainer}>
                {/* Cender  */}
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.cendreText}>Gender</Text>
                  <Text style={PersonStyles.cendres}>
                    {person?.gender === 1 ? "female" : "Male"}
                  </Text>
                </View>
                {/* Birthday */}
                <Divider style={PersonStyles.divider} />
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.cendreText}>Birthday</Text>
                  <Text style={PersonStyles.cendres}>{person?.birthday}</Text>
                </View>
                {/*Know for*/}
                <Divider style={PersonStyles.divider} />
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.cendreText}>Known for</Text>
                  <Text style={PersonStyles.cendres}>
                    {person?.known_for_department}
                  </Text>
                </View>
                {/* Popularity */}
                <Divider style={PersonStyles.divider} />
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.cendreText}>Popularity</Text>
                  <Text style={PersonStyles.cendres}>
                    {person?.popularity?.toFixed(2)}%
                  </Text>
                </View>
                <Divider style={PersonStyles.divider} />
              </View>
              <View style={PersonStyles.bioGraphyContainter}>
                <Text style={PersonStyles.bioGraphyTitle}>Biography</Text>
                <Text style={PersonStyles.bioGraphyText}>
                  {person?.biography || "N/A"}
                </Text>
              </View>

              {<MovieList title={"Movies"} data={personMovies} />}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
