import React from "react";
import { View, Button, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("session_id");
    Alert.alert("Logged out", "You have been logged out.");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView>
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
    </SafeAreaView>
  );
}
