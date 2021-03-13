import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const RoomView = ({ title }) => {
  return (
    <View style={styles.container}>
      <Button title={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: "#B7B0C7",
  },
});

export default RoomView;
