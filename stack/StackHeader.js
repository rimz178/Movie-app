import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import Colors from "../Colors/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

//this code creates a menu on the left side of the header from where you can go to the settings site and home page
export default function StackHeader({ navigation, route, options, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={styles.content}>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} color={Colors.white} />
      ) : null}
      <TouchableOpacity
        style={styles.search}
        onPress={() => navigation.navigate("Search")}
      >
        <MaterialIcons size={25} name="search" color="white" />
      </TouchableOpacity>
      <Appbar.Content
        color="white"
        titleStyle={{
          alignSelf: "auto",
          justifyContent: "center",
          fontWeight: "bold",
          letterSpacing: 1,
          fontSize: 25,
        }}
        title={title}
      />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => navigation.navigate("Settings")}
            title="Settings"
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.backcolor,
    alignItems: "center",
    justifyContent: "center",
  },

  search: {
    marginLeft: 5,
  },
});
