import React, { useCallback, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import FavoritesList from "../components/FavoriteList";
import Colors from "../Colors/Colors";
import { useFocusEffect } from "@react-navigation/native";
import MovieRatingList from "../components/MovieRatingList";
import TvRatingList from "../components/TvRatingList";
import Loading from "../components/Loading"; 

/**
 * ListScreens component displays the user's favorite movies and TV shows,
 * as well as their rated movies and TV shows.
 * @returns {JSX.Element} - The favorites screen.
 */
const ListScreens = ({ sessionId }) => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => !prev);
      setLoading(false);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={[1]}
          renderItem={() => (
            <>
              <View>
                <FavoritesList key={refresh} />
              </View>
              <View>
                <MovieRatingList sessionId={sessionId} key={refresh} />
              </View>
              <View>
                <TvRatingList sessionId={sessionId} key={refresh} />
              </View>
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});

export default ListScreens;
