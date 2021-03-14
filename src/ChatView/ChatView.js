import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, MESSAGES_SUBSCRIPTION } from "../queries/index";
import Chat from "./Chat/Chat";

const ChatView = ({ route }) => {
  const id = route.params.id;
  const { subscribeToMore, ...result } = useQuery(GET_MESSAGES, {
    variables: { id },
  });

  return (
    <Chat
      {...result}
      subscribeToMoreMessages={() => {
        subscribeToMore({
          document: MESSAGES_SUBSCRIPTION,
          variables: { roomId: id },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const newFeedItem = subscriptionData.data.messageAdded;
            return Object.assign({}, prev, {
              room: {
                messages: [...prev.room.messages, newFeedItem],
              },
            });
          },
        });
      }}
    />
  );
};

export default ChatView;
