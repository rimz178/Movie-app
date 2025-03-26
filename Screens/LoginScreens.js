import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Colors from "../Colors/Colors";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  const handleGoToRegister = () => {
    Linking.openURL("https://www.themoviedb.org/signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
       <Text style={styles.buttonText}>Log in</Text>
    </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToRegister}>
        <Text style={styles.registerText}>No account ? create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.backcolor,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#f0f0f0",
    color: "#333333",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  registerText: {
    color: "white",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.loginButton,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff", 
    fontSize: 16,
    fontWeight: "bold",
  },

});
