import { useState } from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { getBannerAdUnitId } from "../utils/adUnits";
import { logger } from "../utils/logger";

/**
 * Small banner ad meant to sit between rows of movies/series, e.g. in a
 * FlatList. Renders nothing (0-height) until the ad has actually loaded,
 * and again if it fails to load, so a slow/blocked ad request never leaves
 * a blank gap or pushes layout around.
 */
export default function AdBanner() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <View style={{ alignItems: "center", opacity: loaded ? 1 : 0 }}>
      <BannerAd
        unitId={getBannerAdUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setLoaded(true)}
        onAdFailedToLoad={(error) => {
          logger.error("Ad failed to load.", error);
          setFailed(true);
        }}
      />
    </View>
  );
}
