import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import RoomView from "./RoomView";

const HomeView = () => {
  const rooms = [1, 2, 3, 4, 5];

  setDimensions = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chat with your friends</Text>
      </View>
      <View
        style={[
          styles.listWrapper,
          { height: Dimensions.get("window").height },
        ]}
      >
        <FlatList
          data={rooms}
          renderItem={({ item }) => <RoomView number={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 0,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#EAEAF4",
  },
  listWrapper: {
    backgroundColor: "#EAEAF4",
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default HomeView;
