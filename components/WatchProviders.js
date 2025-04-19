import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "../Styles/Colors";
import { image185 } from "../Api/ApiParsing";
import { WatchProviderStyles } from "../Styles/WatchProviderStyles";

/**
 * WatchProviders component that displays a list of watch providers.
 *
 * @param {Array} providers - Array of watch provider objects.
 * @returns {JSX.Element} - The watch providers list.
 */
export default function WatchProviders({ providers }) {
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
        renderItem={({ item }) => (
          <TouchableOpacity style={WatchProviderStyles.items}>
            <View style={WatchProviderStyles.imageCircle}>
              <Image
                style={WatchProviderStyles.image}
                source={{
                  uri: item?.logo_path
                    ? image185(item.logo_path)
                    : fallbackProviderLogo,
                }}
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
