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

import Colors from "../Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../Api/ApiParsing";

var { width, height } = Dimensions.get("window");

//this code create upcominmovies carousel
export default function UpcomingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  /* 

  */
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
  console.log("item.poster.path", item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        /*  source={require("../assets/image/image1.jpg")} */
        source={{ uri: image500(item.poster_path) }}
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
