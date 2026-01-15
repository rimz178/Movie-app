import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
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
import { useLanguage } from "../localization/LanguageContext";
import LANGUAGE_CODES from "../localization/languageCodes";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  const { strings, language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
    getPersonSeries(item.id);
  }, [item]);

  const getPersonDetails = async (id, lang = language) => {
    const data = await fetchPersonDetails(id, LANGUAGE_CODES[lang]);
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
    <SafeAreaProvider style={PersonStyles.container}>
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
              <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                <View style={[PersonStyles.infoBox, { flex: 1 }]}>
                  <Text style={PersonStyles.centreText}>
                    {strings.Persons.Gender}
                  </Text>
                  <Text style={PersonStyles.centres}>
                    {person?.gender === 1
                      ? strings.Persons.GenderFemale
                      : person?.gender === 2
                        ? strings.Persons.GenderMale
                        : strings.Persons.GenderOther}
                  </Text>
                </View>
                <View style={[PersonStyles.infoBox, { flex: 1 }]}>
                  <Text style={PersonStyles.centreText}>
                    {strings.Persons.Birthday}
                  </Text>
                  <Text style={PersonStyles.centres}>
                    {person?.birthday || strings.Other.NoInfo}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                <View style={[PersonStyles.infoBox, { flex: 1 }]}>
                  <Text style={PersonStyles.centreText}>
                    {strings.Persons.KnowFor}
                  </Text>
                  <Text style={PersonStyles.centres}>
                    {person?.known_for_department || strings.Other.NoInfo}
                  </Text>
                </View>
                <View style={[PersonStyles.infoBox, { flex: 1 }]}>
                  <Text style={PersonStyles.centreText}>
                    {strings.Persons.Popularity}
                  </Text>
                  <Text style={PersonStyles.centres}>
                    {person?.popularity
                      ? `${person.popularity.toFixed(2)}%`
                      : strings.Other.NoInfo}
                  </Text>
                </View>
              </View>
              <Divider style={PersonStyles.divider} />
              <View style={PersonStyles.bioGraphyContainter}>
                <Text style={PersonStyles.bioGraphyTitle}>
                  {strings.Persons.Biography}
                </Text>
                <Text style={PersonStyles.bioGraphyText}>
                  {person?.biography || strings.Other.NoInfo}
                </Text>
                {!person?.biography && (
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => getPersonDetails(item.id, "en")}
                      style={{
                        ...PersonStyles.ShowEngilshButton,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {strings.Other.ShowEnglish}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {
                <MovieList
                  title={strings.Navigation.Movies1}
                  data={personMovies}
                />
              }
              {personSeries.length > 0 && (
                <SeriesList
                  title={strings.Navigation.Series1}
                  data={personSeries}
                />
              )}
            </View>
          )}
        />
      )}
    </SafeAreaProvider>
  );
}
