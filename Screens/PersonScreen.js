import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import MovieList from "../components/MovieList";
import SeriesList from "../components/SeriesList";
import Loading from "../components/Loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  fetchPersonSeries,
  image342,
} from "../Api/ApiParsing";
import { PersonStyles } from "../Styles/PersonStyles";
import { CommonStyles } from "../Styles/CommonStyles";

/**
 * PersonScreen component that displays details about a person, including their biography and movies.
 *
 * @returns {JSX.Element} - The person details screen.
 */
export default function PersonScreen() {
  const { params: item } = useRoute();
  const [personMovies, setPersonMovies] = useState([]);
  const [personSeries, setPersonSeries] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
    getPersonSeries(item.id);
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

  const getPersonSeries = async (id) => {
    const data = await fetchPersonSeries(id);
    if (data?.cast) setPersonSeries(data.cast);
  };

  return (
    <SafeAreaView style={PersonStyles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[0]}
          keyExtractor={(item, index) => `${item}-${index}`}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          updateCellsBatchingPeriod={50}
          windowSize={3}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <View>
              <View style={PersonStyles.person}>
                <View style={PersonStyles.imageCircle}>
                  {loadingProfileImage && (
                    <ActivityIndicator
                      style={CommonStyles.loading}
                      size="large"
                      color="#E21818"
                    />
                  )}
                  <Image
                    style={PersonStyles.image}
                    source={{
                      uri:
                        image342(person?.profile_path) || fallbackPersonImage,
                    }}
                    onLoadStart={() => setLoadingProfileImage(true)}
                    onLoadEnd={() => setLoadingProfileImage(false)}
                    progressiveRenderingEnabled={true}
                  />
                </View>
              </View>
              <View style={PersonStyles.titleContainer}>
                <Text style={PersonStyles.title}>{person?.name}</Text>
                <Text style={PersonStyles.textStatus}>
                  {person?.place_of_birth}
                </Text>
              </View>
              <View style={PersonStyles.centerContainer}>
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.centreText}>Gender</Text>
                  <Text style={PersonStyles.centres}>
                    {person?.gender === 1 ? "female" : "Male"}
                  </Text>
                </View>

                <Divider style={PersonStyles.divider} />
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.centreText}>Birthday</Text>
                  <Text style={PersonStyles.centres}>{person?.birthday}</Text>
                </View>
                <Divider style={PersonStyles.divider} />
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.centreText}>Known for</Text>
                  <Text style={PersonStyles.centres}>
                    {person?.known_for_department}
                  </Text>
                </View>
                <Divider style={PersonStyles.divider} />
                <View style={PersonStyles.textContainer}>
                  <Text style={PersonStyles.centreText}>Popularity</Text>
                  <Text style={PersonStyles.centres}>
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
              {personSeries.length > 0 && (
                <SeriesList title={"TV Shows"} data={personSeries} />
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
