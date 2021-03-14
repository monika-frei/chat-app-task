import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../queries/index";

const Chat = ({ roomId, data, subscribeToMoreMessages }) => {
  const [messages, setMessages] = useState([]);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [user, setUser] = useState("");

  useEffect(() => {
    subscribeToMoreMessages();
  }, []);

  useEffect(() => {
    const dataMessages = data ? data.room.messages : [];
    const array =
      dataMessages &&
      dataMessages.map((message) => {
        return {
          _id: message.id,
          text: message.body,
          createdAt: message.insertedAt,
          user: {
            _id: message.user.id,
            name: message.user.firstName,
            avatar: message.user.profilePic,
          },
        };
      });
    setMessages(array);
    data && setUser(data.room.user.id);
  }, [data]);

  const onSend = useCallback((messages = []) => {
    sendMessage({
      variables: {
        text: messages[0].text,
        roomId: roomId,
      },
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user,
      }}
    />
  );
};

export default Chat;
