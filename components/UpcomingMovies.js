import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback } from "react";
import Colors from "../Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../Api/ApiParsing";

var { width, height } = Dimensions.get("window");

//this code create upcominmovies carousel
export default function UpcomingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = useCallback(
    (item) => {
      navigation.navigate("Movie", item);
    },
    [navigation]
  );

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
        initialNumToRender={1}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const Movie = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
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
