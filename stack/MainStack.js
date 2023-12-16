import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "../Screens/HomeScreen";
import Settings from "../Screens/Settings";
import StackHeader from "./StackHeader";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
              title: "Home",
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Settings",
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
    <Tab.Navigator>
      <Tab.Screen
        name="Hometab"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
