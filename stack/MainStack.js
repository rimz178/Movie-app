import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import MovieScreen from "../Screens/MovieScreen";
import PersonScreen from "../Screens/PersonScreen";
import LoginScreen from "../Screens/LoginScreens";
import GuestHome from "../Screens/GuestHome";
import BottomTabs from "./BottomTabs";
import SeriesHomeScreen from "../Screens/SeriesHomeScreen";
import Colors from "../Styles/Colors";
import SeriesDetailScreen from "../Screens/SeriesDetailScreen";
const Stack = createStackNavigator();
import { useLanguage } from "../localization/LanguageContext";
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
  const [isLoading, setIsLoading] = useState(true);
  const { strings } = useLanguage();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionId = await AsyncStorage.getItem("session_id");
        if (sessionId) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        logger.error("Error checking session:", error);
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
      <NavigationContainer independent={false}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "MainTabs" : "Login"}
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
              title: strings.Header.GuestHome,
            }}
          />
          <Stack.Screen
            name="MainTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Movie"
            component={MovieScreen}
            options={{
              headerBackTitle: strings.Navigation.Back,
              title: strings.Navigation.MoviesDetails,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              headerBackTitle: strings.Navigation.Back,
              title: strings.Navigation.Person,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Series"
            component={SeriesHomeScreen}
            options={{
              headerBackTitle: strings.Navigation.Back,
              title: strings.Navigation.Series1,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="SeriesDetails"
            component={SeriesDetailScreen}
            options={{
              headerBackTitle: strings.Navigation.Back,
              title: strings.Navigation.SeriesDetails,
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainStack;
