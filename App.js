import "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import "react-native-url-polyfill/auto";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { useEffect, useRef } from "react";

enableScreens();

import MainStack from "./stack/MainStack";
import { LanguageProvider } from "./localization/LanguageContext";

/**
 * App component that initializes the application and renders the main navigation stack.
 *
 * @returns {JSX.Element} - The root component of the app.
 */
function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((_notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const movieId = response.notification.request.content.data?.movieId;
        if (movieId) {
        }
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <MainStack />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
