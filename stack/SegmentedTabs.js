import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../Screens/HomeScreen";
import SeriesHomeScreen from "../Screens/SeriesHomeScreen";
import { useLanguage } from "../localization/LanguageContext";

const TopTab = createMaterialTopTabNavigator();

export default function SegmentedTabs() {
  const { strings } = useLanguage();

  return (
    <TopTab.Navigator
      initialRouteName="MoviesTab"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#222" },
        tabBarIndicatorStyle: { backgroundColor: "#E60505" },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <TopTab.Screen
        name="MoviesTab"
        component={HomeScreen}
        options={{ tabBarLabel: strings.Navigation.Movies1 }}
      />
      <TopTab.Screen
        name="SeriesTab"
        component={SeriesHomeScreen}
        options={{ tabBarLabel: strings.Navigation.Series1 }}
      />
    </TopTab.Navigator>
  );
}
