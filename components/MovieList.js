import React, { useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	Image,
	Dimensions,
} from "react-native";
import Colors from "../Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../Api/ApiParsing";

const { width, height } = Dimensions.get("window");
// show  movies
export default function MovieList({ title, data }) {
	const navigation = useNavigation();

	const handleClick = useCallback(
		(item) => {
			navigation.navigate("Movie", item);
		},
		[navigation],
	);

	const renderItem = ({ item }) => (
		<TouchableWithoutFeedback onPress={() => handleClick(item)}>
			<View>
				<Image
					style={styles.image}
					source={{
						uri: image185(item.poster_path) || fallbackMoviePoster,
						loading: "lazy",
					}}
				/>
				<Text style={styles.text}>
					{item?.title && item.title.length > 14
						? `${item.title.slice(0, 14)}...`
						: item?.title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);

	return (
		<View>
			<View>
				<Text style={styles.titletext}>{title}</Text>
			</View>
			<FlatList
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				initialNumToRender={2}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			/>
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
