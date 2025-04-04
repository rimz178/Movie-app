import React, { useEffect, useState } from "react";
import Colors from "../Colors/Colors";
import { View, StyleSheet, SafeAreaView,Text } from "react-native";
import { SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
function SeriesScreen( {route}) {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("series");
 
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    if (newValue === "movies") {
      navigation.navigate("MainTabs");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.segmentContainer}>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={handleTabChange}
          buttons={[
            {
              value: "movies",
              label: "Movies",
              icon: "movie",
            },
            {
              value: "series",
              label: "Series",
              icon: "television-classic",
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backcolor,
    paddintBottom: 60
  },
  guestText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  segmentContainer: {
    padding: 10,
  },
});
export default SeriesScreen;