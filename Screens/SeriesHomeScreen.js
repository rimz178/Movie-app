import React, { useEffect, useState } from "react";
import Colors from "../Colors/Colors";
import { View, StyleSheet, SafeAreaView,Text, FlatList } from "react-native";
import { SegmentedButtons } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import SeriesList from "../components/SeriesList";
import Loading from "../components/Loading";

import { fetchTrendingSeries} from "../Api/ApiParsing";

function SeriesHomeScreen( {route}) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Series");
  const [isGuest, setIsGuest] = useState(false);

   const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    if (newValue === "movies") {
      navigation.navigate("MainTabs");
    }
  };

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
   
  }, [route]);

   const getTrendingSeries = async () => {
      const data = await fetchTrendingSeries();
      if (data?.results) setTrending(data.results);
      setLoading(false);
    };


  return (
    <SafeAreaView style={styles.container}>
      {loading?(
        <Loading/>
      ):(
        <>
         {isGuest && (
            <Text style={styles.guestText}>
              Welcome, Guest! Log in to access more features like favorites.
            </Text>
          )}
      <View style={styles.segmentContainer}>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={handleTabChange}
          buttons={[
            {
              value: "movies",
              label: "Movies",
              icon: "movie",
            },
            {
              value: "series",
              label: "Series",
              icon: "television-classic",
              
            },
          ]}
        />
      </View>
      <FlatList
        initialNumToRender={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[
          { 
            key: "Trending Series", 
            title: "Trending Series", 
            data: trending 
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
    paddingBottom: 60
  },
  guestText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  segmentContainer: {
    padding: 10,
  },
});
export default SeriesHomeScreen;