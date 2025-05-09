import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      password
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      password: $password
    ) {
      id
      username
      email
      password
    }
  }
`;
