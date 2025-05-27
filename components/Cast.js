import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { fallbackPersonImage, image185 } from "../Api/ApiParsing";
import { CastStyles } from "../Styles/CastStyles";

/**
 * Cast component that displays a list of cast members.
 *
 * @param {Array} cast - List of cast members.
 * @param {object} navigation - Navigation object for navigating to the Person screen.
 */
export default function Cast({ cast, navigation }) {
  if (!cast || cast.length === 0) {
    return (
      <View style={CastStyles.container}>
        <Text style={CastStyles.titleText}>No Cast Available</Text>
      </View>
    );
  }
  return (
    <View style={CastStyles.container}>
      <Text style={CastStyles.titleText}>Top Cast</Text>
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
            style={CastStyles.items}
            onPress={() => navigation.navigate("Person", item)}
          >
            <View style={CastStyles.imageCircle}>
              <Image
                style={CastStyles.image}
                source={{
                  uri: image185(item?.profile_path) || fallbackPersonImage,
                  loading: "lazy",
                }}
              />
            </View>
            <Text style={CastStyles.text}>
              {item?.character.length > 10
                ? `${item?.character.slice(0, 10)}...`
                : item?.character}
            </Text>
            <Text style={CastStyles.text}>
              {item?.original_name.length > 10
                ? `${item?.original_name.slice(0, 10)}...`
                : item?.original_name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
