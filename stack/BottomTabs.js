import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import ListScreens from "../Screens/ListScreens";
import SearchBars from "../components/SearchBars";
import SettingsScreen from "../Screens/SettingsScreen";
import Colors from "../Styles/Colors";
import LoginScreen from "../Screens/LoginScreens";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabsStyles } from "../Styles/BottomTabsStyles";
import { logger } from "../utils/logger";
const Tab = createBottomTabNavigator();
import SegmentedTabs from "./SegmentedTabs";
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
          logger.error("Failed to retrieve session_id:", error);
          setIsGuest(true);
        });
    }
  }, [route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "MyListsTab") {
            iconName = "list";
          } else if (route.name === "SearchTab") {
            iconName = "search";
          } else if (
            route.name === "SettingsTab" ||
            route.name === "LoginTab"
          ) {
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
        name="HomeTab"
        component={SegmentedTabs}
        initialParams={{ isGuest }}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchBars}
        options={{
          title: "Search",
        }}
      />
      {!isGuest && (
        <Tab.Screen
          name="MyListsTab"
          component={ListScreens}
          options={{
            title: "Favorites & Rated",
          }}
        />
      )}
      <Tab.Screen
        name={isGuest ? "LoginTab" : "SettingsTab"}
        component={isGuest ? LoginScreen : SettingsScreen}
        options={{
          title: isGuest ? "Login" : "Settings",
          headerShown: !isGuest,
        }}
      />
    </Tab.Navigator>
  );
}
