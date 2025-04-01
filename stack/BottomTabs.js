import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import FavoriteScreen from "../Screens/FavoritesScreen";
import SearchBars from "../components/SearchBars";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "FavoritesTab") {
            iconName = "heart";
          } else if (route.name === "SearchTab") {
            iconName = "search";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="FavoritesTab" component={FavoriteScreen} />
      <Tab.Screen name="SearchTab" component={SearchBars} />
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
