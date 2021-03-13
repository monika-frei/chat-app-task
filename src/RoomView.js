import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const RoomView = ({ number }) => {
  return (
    <View style={styles.container}>
      <Button title={`Room ${number}`} />
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
