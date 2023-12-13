import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../Screens/HomeScreen";
import Settings from "../Screens/Settings";
import Colors from "../Colors/Colors";
import StackHeader from "./StackHeader";

const Stack = createStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
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
            title: "Home",

            headerStyle: {
              backgroundColor: Colors.backcolor,
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: Colors.white,
              fontSize: 23,
            },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Settings",
            headerStyle: {
              backgroundColor: Colors.backcolor,
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: Colors.white,
              fontSize: 23,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;

/* 

 headerModer="screen"
        screenOptions={{
          header: (scene, navigation) => {
            <StackHeader scene={scene} navigation={navigation} />;
          },
        }}
<Stack.Screen
name="Settings"
component={Settings}
options={{
  title: "Settings",
  headerStyle: {
    backgroundColor: Colors.backcolor,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 23,
  },
}}
/> */
