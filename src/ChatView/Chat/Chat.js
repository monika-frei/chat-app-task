import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ data }) => {
  const [messages, setMessages] = useState([]);

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
  }, [data]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chat;
