import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "../Screens/HomeScreen";
import MovieScreen from "../Screens/MovieScreen";
import StackHeader from "./StackHeader";
import SearchBars from "../components/SearchBars";
import PersonScreen from "../Screens/PersonScreen";
import LoginScreen from "../Screens/LoginScreens";
import GuestHome from "../Screens/GuestHome";
import BottomTabs from "./BottomTabs";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionId = await AsyncStorage.getItem("session_id");
        if (sessionId) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "Home" : "Login"}
          screenOptions={{
            header: (props) => <StackHeader {...props} />,
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
            name="Search"
            component={SearchBars}
            options={{
              title: "Search",
            }}
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
