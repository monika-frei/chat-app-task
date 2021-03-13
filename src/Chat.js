import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "./queries/index";

const Chat = ({ route }) => {
  const id = route.params.id;
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { id: id },
  });
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: ${error}</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={data.room.messages}
        renderItem={({ item }) => (
          <View>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Chat;
