import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import Colors from "../Colors/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

/**
 * show the stack header
 *
 * @param {*} navigation
 * @returns stack header
 */
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

      <Appbar.Content
        color="white"
        titleStyle={{
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: 1,
          fontSize: 25,
        }}
        title={title}
      />
      <TouchableOpacity
        style={styles.search}
        onPress={() => navigation.navigate("Search")}
      >
        <MaterialIcons size={25} name="search" color="white" />
      </TouchableOpacity>

      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }
        />
      ) : null}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.backcolor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  search: {
    marginRight: 10,
  },
});
