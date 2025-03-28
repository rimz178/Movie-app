import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

/**
 * Custom header component for the navigation stack.
 *
 * @param {object} navigation - Navigation object for navigation actions.
 * @param {object} route - Current route object with screen info.
 * @param {object} options - Header options like title and styles.
 * @param {boolean} back - Indicates if the back button should be shown.
 * @returns {JSX.Element} - The custom header component.
 */
export default function StackHeader({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("session_id");
    navigation.navigate("Login");
  };

  const isLoginScreen = route.name === "Login";
  const isHomeScreen = route.name === "Home";
  const isGuestHome = route.name === "GuestHome";
  return (
    <Appbar.Header style={styles.content}>
      {back && !isLoginScreen && !isHomeScreen ? (
        <Appbar.BackAction onPress={navigation.goBack} color="white" />
      ) : null}

      <Appbar.Content
        title={title}
        titleStyle={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          color: "white",
        }}
      />
      {!isLoginScreen && (
        <Appbar.Action
          icon="magnify"
          color="white"
          onPress={() => navigation.navigate("Search")}
        />
      )}

      {isHomeScreen ? (
        <Appbar.Action icon="logout" color="white" onPress={handleLogout} />
      ) : isGuestHome ? (
        <Appbar.Action
          icon="login"
          color="white"
          onPress={() => navigation.navigate("Login")}
        />
      ) : null}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#121212",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
