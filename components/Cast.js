import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "../Colors/Colors";
import { fallbackPersonImage, image185 } from "../Api/ApiParsing";

var { width, height } = Dimensions.get("window");

export default function Cast({ cast, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Top Cast</Text>
      <FlatList
        data={cast}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        initialNumToRender={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.items}
            onPress={() => navigation.navigate("Person", item)}
          >
            <View style={styles.imageCircle}>
              <Image
                style={styles.image}
                source={{
                  uri: image185(item?.profile_path) || fallbackPersonImage,
                  loading: "lazy",
                }}
              />
            </View>
            <Text style={styles.text}>
              {item?.character.length > 10
                ? item?.character.slice(0, 10) + "..."
                : item?.character}
            </Text>
            <Text style={styles.text}>
              {item?.original_name.length > 10
                ? item?.original_name.slice(0, 10) + "..."
                : item?.original_name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },

  items: {
    marginStart: -10,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    color: Colors.white,
    fontSize: 15,
  },
  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (height * 0.3) / 2,
    overflow: "hidden",
  },
  image: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 20,
    resizeMode: "cover",
    borderRadius: (height * 0.3) / 2,
    padding: 5,
    margin: 2,
  },
});
