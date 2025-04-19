import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import ListScreens from "../Screens/ListScreens";
import SearchBars from "../components/SearchBars";
import SettingsScreen from "../Screens/SettingsScreen";
import Colors from "../Styles/Colors";
import LoginScreen from "../Screens/LoginScreens";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabsStyles } from "../Styles/BottomTabsStyles";

const Tab = createBottomTabNavigator();

/**
 * BottomTabs component that creates a tab navigator for the app.
 *
 * @returns {JSX.Element} - The bottom tab navigator.
 */
export default function BottomTabs(route) {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (route?.params?.isGuest) {
      setIsGuest(true);
    } else {
      AsyncStorage.getItem("session_id")
        .then((sessionId) => {
          if (!sessionId) {
            setIsGuest(true);
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve session_id:", error);
          setIsGuest(true);
        });
    }
  }, [route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "MyLists") {
            iconName = "list";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Settings" || route.name === "Login") {
            iconName = isGuest ? "log-in" : "settings";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.buttonColor,
        tabBarInactiveTintColor: Colors.status,
        headerShown: true,
        tabBarStyle: BottomTabsStyles.tabBar,
        headerStyle: BottomTabsStyles.header,
        headerTintColor: Colors.white,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ isGuest }}
        options={{
          title: "Movie Home",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchBars}
        options={{
          title: "Search Movies",
        }}
      />
      {!isGuest && (
        <Tab.Screen
          name="MyLists"
          component={ListScreens}
          options={{
            title: "Favorites & Rated",
          }}
        />
      )}
      <Tab.Screen
        name={isGuest ? "Login" : "Settings"}
        component={isGuest ? LoginScreen : SettingsScreen}
        options={{
          title: isGuest ? "Login" : "Settings",
          headerShown: !isGuest,
        }}
      />
    </Tab.Navigator>
  );
}

