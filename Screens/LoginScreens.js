import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Colors from "../Styles/Colors";
import {
  fetchRequestToken,
  validateWithLogin,
  createSession,
} from "../Api/ApiParsing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStyles } from "../Styles/LoginStyles";
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
        Alert.alert("Invalid username or password");
        return;
      }

      const sessionData = await createSession(tokenData.request_token);
      if (!sessionData.success) {
        Alert.alert("Failed to create session");
        return;
      }

      await AsyncStorage.setItem("session_id", sessionData.session_id);

      navigation.replace("MainTabs");
    } catch (error) {
      Alert.alert("An error occurred during login");
    }
  };

  const handleGoToRegister = () => {
    Linking.openURL("https://www.themoviedb.org/signup");
  };
  const handleSkipLogin = () => {
    navigation.navigate("GuestHome");
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}> Welcome </Text>
      <Text style={LoginStyles.login}>Log in</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={LoginStyles.buttonRow}>
        <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
          <Text style={LoginStyles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={LoginStyles.button} onPress={handleSkipLogin}>
          <Text style={LoginStyles.buttonText}>Guest user</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleGoToRegister}>
        <Text style={LoginStyles.registerText}>No account? Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

