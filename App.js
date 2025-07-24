import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

enableScreens();

import MainStack from "./stack/MainStack";
import { LanguageProvider } from "./localication/LanguageContext";
/**
 * App component that initializes the application and renders the main navigation stack.
 *
 * @returns {JSX.Element} - The root component of the app.
 */
function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <MainStack />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({});
