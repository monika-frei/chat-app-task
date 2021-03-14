import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterMessage(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    registerUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      user {
        email
        firstName
        lastName
        profilePic
        id
        role
      }
    }
  }
`;

export const GET_ROOMS = gql`
  query GetRooms {
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

export const GET_MESSAGES = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      messages {
        body
        id
        insertedAt
        user {
          email
          firstName
          id
          lastName
          profilePic
          role
        }
      }
      name
      roomPic
      user {
        email
        firstName
        id
        lastName
        profilePic
        role
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $roomId: String!) {
    sendMessage(body: $text, roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        lastName
        profilePic
        id
        role
      }
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        lastName
        id
        profilePic
        role
      }
    }
  }
`;
