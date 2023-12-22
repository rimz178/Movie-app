import React from "react";
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

var { width, height } = Dimensions.get("window");

export default function MovieList({ data, title }) {
  let movieName = "Tenet";
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text style={styles.Titletext}>{title}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("movie", item)}
            >
              <View>
                <Image
                  style={styles.image}
                  source={require("../assets/image/image2.jpg")}
                />
                <Text style={styles.text}>
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
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
  Titletext: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
    padding: 20,
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
