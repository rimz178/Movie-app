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
  let movieName = "Shotgun Wedding";
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
            style={{
              width,
              height: height * 0.48,
              borderRadius: 20,
            }}
            source={require("../assets/image/image1.jpg")}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.titletext}>{movieName}</Text>
        {/* status, release , runtime */}
        <Text style={styles.textStatus}>Released • 2022 • 120 min</Text>
      </View>
      {/* genres  */}
      <View style={styles.genre}>
        <Text style={styles.textStatus}>Action •</Text>
        <Text style={styles.textStatus}>Comedy • </Text>
        <Text style={styles.textStatus}>Romance </Text>
      </View>
      {/* decription text */}
      <View style={styles.decsription}>
        <Text style={styles.descriptionText}>
          Darcy and Tom gather their families for the ultimate destination
          wedding but when the entire wedding party is taken hostage the bride
          and groom must save their loved ones--if they don't kill each other
          first.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scorl: {
    flex: 1,
    padding: 50,
    paddingTop: 30,
    backgroundColor: Colors.backcolor,
    marginLeft: -40,
    marginRight: -40,
  },
  container: {},
  images: {
    marginTop: 25,
  },
  titletext: {
    fontSize: 25,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStatus: {
    margin: 3,
    marginTop: 5,
    fontSize: 15,
    color: Colors.status,
    textAlign: "center",
  },
  genre: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  decsription: {},
  descriptionText: {
    margin: 3,
    fontSize: 15,
    color: Colors.status,
    textAlign: "left",
  },
});
