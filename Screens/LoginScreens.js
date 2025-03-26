import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Colors from "../Colors/Colors";
import {
  fetchRequestToken,
  validateWithLogin,
  createSession,
} from "../Api/ApiParsing";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * LoginScreen component for user authentication.
 *
 * @param {object} navigation - Navigation object for screen transitions.
 * @returns {JSX.Element} - The login screen.
 */
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const tokenData = await fetchRequestToken();
      if (!tokenData.success) {
        alert("Failed to get request token");
        return;
      }

      const loginData = await validateWithLogin(
        username,
        password,
        tokenData.request_token,
      );
      if (!loginData.success) {
        alert("Invalid username or password");
        return;
      }

      const sessionData = await createSession(tokenData.request_token);
      if (!sessionData.success) {
        alert("Failed to create session");
        return;
      }
      await AsyncStorage.setItem("session_id", sessionData.session_id);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  const handleGoToRegister = () => {
    Linking.openURL("https://www.themoviedb.org/signup");
  };
  const handleSkipLogin = () => {
    navigation.navigate("GuestHome");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome </Text>
      <Text style={styles.login}>Log in</Text>
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
      <TouchableOpacity style={styles.skipButton} onPress={handleSkipLogin}>
        <Text style={styles.skipButtonText}>Guest user</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoToRegister}>
        <Text style={styles.registerText}>No account? Create new account</Text>
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
    fontSize: 30,
    color: Colors.white,
    fontWeight: "bold",
    marginBottom: 30,
  },
  login: {
    fontSize: 24,
    marginBottom: 20,
    color: Colors.white,
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
  skipButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.loginButton,
  },
  skipButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
