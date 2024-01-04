import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Colors from "../Colors/Colors";
import { fallbackPersonImage, image185 } from "../Api/ApiParsing";

var { width, height } = Dimensions.get("window");

export default function Cast({ cast, navigation }) {
  let personName = "Keanu Reeves";
  let characterName = "John Wick";

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Top Cast</Text>

      <ScrollView
        removeClippedSubviews
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.items}
                onPress={() => navigation.navigate("Person", person)}
              >
                <Image
                  style={styles.image}
                  /* source={require("../assets/image/keaunu.jpg")} */
                  source={{
                    uri: image185(person?.profile_path) || fallbackPersonImage,
                  }}
                />
                <Text style={styles.text}>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text style={styles.text}>
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
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
  image: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 20,
    alignItems: "center",
    padding: 5,
    margin: 2,
  },
});
