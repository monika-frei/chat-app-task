import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import RoomView from "./RoomView";
import { useQuery, gql } from "@apollo/client";

const GET_ROOMS = gql`
  {
    usersRooms {
      user {
        email
        firstName
        id
        lastName
        profilePic
        role
      }
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;

const HomeView = () => {
  const { loading, error, data } = useQuery(GET_ROOMS);

  const rooms = [];

  if (loading) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Error: ${error}</Text>
      </View>
    );
  }

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
          data={data.usersRooms.rooms}
          renderItem={({ item }) => <RoomView title={item.name} />}
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
  messageContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    color: "#EAEAF4",
  },
});

export default HomeView;
