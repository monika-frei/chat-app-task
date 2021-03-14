import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const RoomListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatRoom", { title: item.name, id: item.id })
      }
    >
      <View style={styles.container}>
        <Image style={styles.roomImage} source={{ uri: item.roomPic }}></Image>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  roomImage: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 25,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});

export default RoomListItem;
