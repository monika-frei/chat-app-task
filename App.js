import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeView from "./src/HomeView";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1E78",
  },
});
