import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import React from "react";
import data from "../data";
import Carousel from "react-native-snap-carousel";
import Colors from "../Colors/Colors";

export default function ImageCollase() {
  const { width: screenWidth } = Dimensions.get("window");

  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 8;

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.imgUrl} style={styles.itemImg} />
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.text}>Now Playing Cinemas</Text>
      <Carousel
        layout="tinder"
        data={data}
        renderItem={renderItem}
        firstItem={1}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    height: 450,
    borderRadius: 20,
  },
  itemImg: {
    margin: 20,
    padding: 20,
    width: 250,
    height: 250,
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
