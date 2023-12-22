import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../Colors/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  useEffect(() => {}, [item]);
  return (
    <ScrollView style={styles.scorl}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons size={28} name="arrow-back" color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.images}>
          <Image
            style={{ width, height: height * 0.48 }}
            source={require("../assets/image/image1.jpg")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scorl: {
    flex: 1,
    padding: 60,
    paddingTop: 30,
    backgroundColor: Colors.backcolor,
    marginLeft: -50,
  },
  container: {
    width: "100%",
    flex: "row",
  },
  images: {
    marginTop: 20,
  },
});
