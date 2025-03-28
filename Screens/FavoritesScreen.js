import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import FavoritesList from "../components/FavoriteList";
import Colors from "../Colors/Colors";
import { useFocusEffect } from "@react-navigation/native";

const FavoritesScreen = () => {
  const [refresh, setRefresh] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => !prev);
    }, []),
  );

  return (
    <View style={styles.container}>
      <FavoritesList key={refresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
  },
});

export default FavoritesScreen;
