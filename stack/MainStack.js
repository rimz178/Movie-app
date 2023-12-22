import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "../Screens/HomeScreen";
import Settings from "../Screens/Settings";
import MovieScreen from "../Screens/MovieScreen";
import StackHeader from "./StackHeader";
import Colors from "../Colors/Colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//this code creates a transition between the possibility setting and the home page
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
            component={HomeTabNavigator}
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
//create tabnavigator
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.buttonColor,
        tabBarInactiveTintColor: Colors.white,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.bottomColor,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="HomeS"
        component={HomeScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
