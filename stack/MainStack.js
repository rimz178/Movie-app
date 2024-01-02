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
import SearchBars from "../components/SearchBars";

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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
//create tabnavigator
/* const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.buttonColor,
        tabBarInactiveTintColor: Colors.white,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.bottomColor,
          position: "absolute",
          borderRadius: 15,
          opacity: 0.8,
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
 */
export default MainStack;
