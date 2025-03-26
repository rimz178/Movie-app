import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "../Screens/HomeScreen";
import Settings from "../Screens/Settings";
import MovieScreen from "../Screens/MovieScreen";
import StackHeader from "./StackHeader";
import SearchBars from "../components/SearchBars";
import PersonScreen from "../Screens/PersonScreen";
import LoginScreen from "../Screens/LoginScreens"; // Lisätty LoginScreen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


/**
 * show the main stack with all the screens.
 * 
 * @returns 
 * 
 */
function MainStack() {
  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Login" 
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
            name="Home"
            component={HomeScreen}
            options={{
              title: "Etusivu", // Otsikon nimi
            }}
          />
          {/* Search-näyttö */}
          <Stack.Screen
            name="Search"
            component={SearchBars}
            options={{
              title: "Haku", // Otsikon nimi
            }}
          />
          {/* Settings-näyttö */}
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Asetukset", // Otsikon nimi
            }}
          />
          {/* Movie-näyttö */}
          <Stack.Screen
            name="Movie"
            component={MovieScreen}
            options={{
              headerShown: false, // Piilotetaan otsikko
            }}
          />
          {/* Person-näyttö */}
          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              headerShown: false, // Piilotetaan otsikko
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainStack;