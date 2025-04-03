import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import FavoriteScreen from "../Screens/FavoritesScreen";
import SearchBars from "../components/SearchBars";
import SettingsScreen from "../Screens/SettingsScreen";
import Colors from "../Colors/Colors";

const Tab = createBottomTabNavigator();

/**
 * BottomTabs component that creates a tab navigator for the app.
 *
 * @returns {JSX.Element} - The bottom tab navigator.
 */
export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.buttonColor,
        tabBarInactiveTintColor: Colors.status,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: Colors.backcolor,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          elevation: 0, 
          borderTopColor: 'transparent', 
        },
        headerStyle: {
          backgroundColor: Colors.backcolor,
        },
        headerTintColor: Colors.white,
      })}
    >
     <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: "Movie home"
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoriteScreen}
        options={{
          title: "My Favorites"
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchBars}
        options={{
          title: "Search Movies"
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: "Settings"
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#222",
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 10,
  },
});
