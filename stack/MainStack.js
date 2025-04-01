import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import MovieScreen from "../Screens/MovieScreen";
import PersonScreen from "../Screens/PersonScreen";
import LoginScreen from "../Screens/LoginScreens";
import GuestHome from "../Screens/GuestHome";
import BottomTabs from "./BottomTabs";
import Colors from "../Colors/Colors";
const Stack = createStackNavigator();

/**
 * MainStack component for managing the app's navigation.
 *
 * Handles:
 * - Checking login status via AsyncStorage.
 * - Setting the initial screen (Login or Home).
 * - Navigating between screens like Home, Search, Movie, and Person.
 *
 * @returns {JSX.Element} - The main navigation stack.
 */
function MainStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedInStored = await AsyncStorage.getItem("isLoggedIn");
      const sessionId = await AsyncStorage.getItem("session_id");

      console.log("isLoggedIn fetched:", isLoggedInStored); // Debug
      console.log("Session ID fetched:", sessionId); // Debug

      if (isLoggedInStored === "true" && sessionId) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkLoginStatus();
  }, []); // This effect runs only once on component mount

  return (
    <PaperProvider>
      <NavigationContainer independent={false}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "Home" : "Login"}
          screenOptions={{
            headerStyle: {
              backgroundColor: "#222",
            },
            headerTintColor: Colors.white,
          }}
        >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
      
          <Stack.Screen
            name="GuestHome"
            component={GuestHome}
            options={{
              title: "Guest Home",
            }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ title: "Home", headerShown: true }}
          />
          <Stack.Screen
            name="Movie"
            component={MovieScreen}
            options={{
              title: "Movie",
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              title: "Person",
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainStack;
