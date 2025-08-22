import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { image185, fallbackProviderLogo } from "../Api/ApiParsing";
import { WatchProviderStyles } from "../Styles/WatchProviderStyles";
import { useLanguage } from "../localization/LanguageContext";
import LANGUAGE_CODES from "../localization/languageCodes";
import { WebView } from "react-native-webview";

export default function WatchProviders({
  providers,
  tmdbId,
  type = "movie",
  countryCode,
}) {
  const [loadingImages, setLoadingImages] = useState({});
  const [showWebView, setShowWebView] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const [webViewError, setWebViewError] = useState(false);
  const { strings, language } = useLanguage();

  const locale =
    countryCode || (LANGUAGE_CODES[language] ? LANGUAGE_CODES[language] : "FI");

  if (!providers || providers.length === 0) {
    return (
      <View style={WatchProviderStyles.container}>
        <Text style={WatchProviderStyles.titleText}>
          {strings.ErrorMessage.NoProviders}
        </Text>
      </View>
    );
  }

  const uniqueProviders = providers?.filter(
    (v, i, a) => a.findIndex((t) => t.provider_id === v.provider_id) === i,
  );

  const handleProviderPress = () => {
    const url = `https://www.themoviedb.org/${type}/${tmdbId}/watch?locale=${locale}`;
    setWebUrl(url);
    setWebViewError(false);
    setShowWebView(true);
  };

  const onWebViewError = () => {
    setWebViewError(true);
  };

  return (
    <View style={WatchProviderStyles.container}>
      <Text style={WatchProviderStyles.titleText}>
        {strings.Other.WatchProviders}
      </Text>
      <FlatList
        data={uniqueProviders}
        keyExtractor={(item, index) =>
          item?.provider_id ? `provider_${item.provider_id}` : `index_${index}`
        }
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={WatchProviderStyles.items}
            onPress={handleProviderPress}
          >
            <View style={WatchProviderStyles.imageCircle}>
              <Image
                style={WatchProviderStyles.image}
                source={{
                  uri: item?.logo_path
                    ? image185(item.logo_path)
                    : fallbackProviderLogo,
                }}
                onLoadStart={() =>
                  setLoadingImages({
                    ...loadingImages,
                    [item?.provider_id]: true,
                  })
                }
                onLoadEnd={() =>
                  setLoadingImages({
                    ...loadingImages,
                    [item?.provider_id]: false,
                  })
                }
                progressiveRenderingEnabled={true}
              />
            </View>
            <Text style={WatchProviderStyles.text}>
              {item?.provider_name?.length > 10
                ? `${item?.provider_name.slice(0, 10)}...`
                : item?.provider_name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={showWebView} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#18171c" }}>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#18171c",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowWebView(false);
                setWebViewError(false);
              }}
            >
              <Text style={{ color: "#d00", fontSize: 18 }}>
                {strings.Settings.Close}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 16, marginLeft: 20 }}>
              TMDb
            </Text>
          </View>
          {webViewError ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, marginBottom: 20 }}>
                {strings?.Other.WebViewErrorFallback}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowWebView(false);
                  setWebViewError(false);
                }}
              >
                <Text style={{ color: "#d00", fontSize: 18 }}>
                  {strings.Settings.Close}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <WebView
              source={{ uri: webUrl }}
              style={{ flex: 1 }}
              startInLoadingState
              onError={onWebViewError}
            />
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
}
