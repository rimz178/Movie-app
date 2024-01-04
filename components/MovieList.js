import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import Colors from "../Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";

var { width, height } = Dimensions.get("window");
// show  movies
export default function MovieList({ title, data }) {
  const navigation = useNavigation();
  const handleClick = useCallback(
    (item) => {
      navigation.navigate("Movie", item);
    },
    [navigation]
  );
  return (
    <View>
      <View>
        <Text style={styles.titletext}>{title}</Text>
      </View>
      <ScrollView
        removeClippedSubviews
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClick(item)}
            >
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                />
                <Text style={styles.text}>
                  {item && item.title && item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item && item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  titletext: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
    padding: 15,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    padding: 10,
  },
  image: {
    width: width * 0.33,
    height: height * 0.22,
    margin: 10,
    borderRadius: 10,
  },
});
