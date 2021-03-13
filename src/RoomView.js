import React, { useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const RoomView = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title={item.name}
        onPress={() =>
          navigation.navigate("ChatRoom", { title: item.name, id: item.id })
        }
      />
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
