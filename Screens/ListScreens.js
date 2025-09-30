import React, { useCallback, useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoritesList from "../components/FavoriteList";
import { useFocusEffect } from "@react-navigation/native";
import MovieRatingList from "../components/MovieRatingList";
import TvRatingList from "../components/TvRatingList";
import Loading from "../components/Loading";
import { GlobalStyles } from "../Styles/GlobalStyles";
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
    <SafeAreaView style={GlobalStyles.container}>
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

export default ListScreens;
