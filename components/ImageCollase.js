import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import data from "../data";

import Colors from "../Colors/Colors";
// this code create imgaCarusel in homepage
export default function ImageCollase() {
  const { width: screenWidth } = Dimensions.get("window");

  const sliderWidth = screenWidth;
  const itemWidth = screenWidth;
  const [activeDotIndex, setActiveDoIndex] = useState(0);
  const _carousel = useRef();

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
      <FlatList
        ref={_carousel}
        layout="default"
        data={data}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
}
const styles = StyleSheet.create({
  itemImg: {
    margin: 15,
    padding: 20,
    width: 350,
    height: 350,
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
