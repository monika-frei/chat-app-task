import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
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

export const GET_MESSAGES = gql`
  query room($id: ID!) {
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
