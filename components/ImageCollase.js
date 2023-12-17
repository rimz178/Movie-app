import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import React, { useRef, useState } from "react";
import data from "../data";
import Carousel, { Pagination } from "react-native-snap-carousel";
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
      <Carousel
        ref={_carousel}
        layout="default"
        data={data}
        renderItem={renderItem}
        firstItem={1}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        onSnapToItem={(index) => setActiveDoIndex(index)}
      />
      <View>
        <Pagination
          carouselRef={_carousel}
          activeDotIndex={activeDotIndex}
          dotsLength={3}
        />
      </View>
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
/* if (prevProps.item.imgUrl !== nextProps.item.imgUrl) {
  return false;
}
return prevProps.item?.imgUrl === nextProps.item?.imgUrl;
 */
