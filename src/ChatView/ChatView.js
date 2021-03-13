import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../queries/index";
import Chat from "./Chat/Chat";

const ChatView = ({ route }) => {
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
  return <Chat data={data} />;
};

export default ChatView;
