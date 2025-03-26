import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../Colors/Colors";

function Settings() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Settings</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.backcolor,
	},
	text: {
		color: Colors.white,
		fontSize: 23,
		fontWeight: "bold",
		letterSpacing: 1,
	},
});

export default Settings;
