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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//this code creates a transition between the possibility settings and the home page
function MainStack() {
  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <StackHeader {...props} />,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Movie-App",
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Movie-App",
            }}
          />
          <Stack.Screen
            name="Movie"
            component={MovieScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchBars}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default MainStack;
