import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "../Styles/Colors";
import { image185, fallbackProviderLogo } from "../Api/ApiParsing";
import { WatchProviderStyles } from "../Styles/WatchProviderStyles";
import { CommonStyles } from "../Styles/CommonStyles";

/**
 * WatchProviders component that displays a list of watch providers.
 *
 * @param {Array} providers - Array of watch provider objects.
 * @returns {JSX.Element} - The watch providers list.
 */
export default function WatchProviders({ providers }) {
  const [loadingImages, setLoadingImages] = useState({});

  if (!providers || providers.length === 0) {
    return (
      <View style={WatchProviderStyles.container}>
        <Text style={WatchProviderStyles.titleText}>
          No Providers Available
        </Text>
      </View>
    );
  }

  const uniqueProviders = providers?.filter(
    (v, i, a) => a.findIndex((t) => t.provider_id === v.provider_id) === i,
  );

  return (
    <View style={WatchProviderStyles.container}>
      <Text style={WatchProviderStyles.titleText}>Watch Providers</Text>
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
          <TouchableOpacity style={WatchProviderStyles.items}>
            <View style={WatchProviderStyles.imageCircle}>
              {loadingImages[item?.provider_id] && (
                <ActivityIndicator
                  style={CommonStyles.loading}
                  size="small"
                  color="#E21818"
                />
              )}
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
    </View>
  );
}
