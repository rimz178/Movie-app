import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
/* import data from "../data"; */
import { fetchUpcoming } from "../Api/ApiParsing";

import Colors from "../Colors/Colors";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

//this code create upcominmovies carousel
export default function UpcomingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  /*  useEffect(() => {
    getUpcomingMovies();
  });

  const getUpcomingMovies = async () => {
    const data = await fetchUpcoming();
    console.log("got upcoming movies: ", data);
      if(data && data.results) setUpcoming
  }; */
  return (
    <View>
      <Text style={styles.text}>Now Playing Cinemas</Text>
      <FlatList
        layout="default"
        data={data}
        renderItem={({ item }) => (
          <Movie item={item} handleClick={handleClick} />
        )}
        horizontal
        initialNumToRender={3}
      />
    </View>
  );
}
const Movie = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require("../assets/image/image1.jpg")}
        style={styles.itemImg}
      />
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  itemImg: {
    margin: 10,
    padding: 20,
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
    padding: 20,
  },
});
