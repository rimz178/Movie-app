import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "../Colors/Colors";
import { image185 } from "../Api/ApiParsing";

const { width, height } = Dimensions.get("window");

export default function WatchProviders({ providers }) {
  if (!providers || providers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>No Providers Available</Text>
      </View>
    );
  }
  const uniqueProviders = providers?.filter(
    (v, i, a) => a.findIndex((t) => t.provider_id === v.provider_id) === i,
  );
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Watch Providers</Text>
      <FlatList
        data={uniqueProviders}
        keyExtractor={(item, index) =>
          item?.provider_id ? `provider_${item.provider_id}` : `index_${index}`
        }
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        initialNumToRender={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.items}>
            <View style={styles.imageCircle}>
              <Image
                style={styles.image}
                source={{
                  uri: item?.logo_path
                    ? image185(item.logo_path)
                    : fallbackProviderLogo,
                }}
              />
            </View>
            <Text style={styles.text}>
              {item?.provider_name?.length > 10
                ? `${item?.provider_name.slice(0, 10)}...`
                : item?.provider_name}
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
    borderRadius: 50,
    overflow: "hidden",
    width: width * 0.2,
    height: width * 0.2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
