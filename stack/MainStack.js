import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
  return (
    <PaperProvider>
      <NavigationContainer independent={false}>
        <Stack.Navigator
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
            options={{ title: "Home", headerShown: false }}
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
