import "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import "react-native-url-polyfill/auto";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { useEffect, useRef } from "react";
import { startUpdateCheck } from "./utils/updateChecker";

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
  const navigationRef = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((_notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { movieId, seriesId, type } =
          response.notification.request.content.data || {};

        if (movieId && type === "upcoming_movie") {
          navigationRef.current?.navigate("Movie", { id: movieId });
        } else if (seriesId && type === "trending_series") {
          navigationRef.current?.navigate("SeriesDetails", { id: seriesId });
        }
      });


    const updateTimer = startUpdateCheck(2000); 

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
      clearTimeout(updateTimer); 
    };
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <MainStack navigationRef={navigationRef} />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
