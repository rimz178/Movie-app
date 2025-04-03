import React, { useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import FavoritesList from "../components/FavoriteList";
import Colors from "../Colors/Colors";
import { useFocusEffect } from "@react-navigation/native";

/**
 * FavoritesScreen component that displays a list of favorite movies.
 *
 * @returns {JSX.Element} - The favorites screen.
 */
const FavoritesScreen = () => {
  const [refresh, setRefresh] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => !prev);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FavoritesList key={refresh} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});

export default FavoritesScreen;
