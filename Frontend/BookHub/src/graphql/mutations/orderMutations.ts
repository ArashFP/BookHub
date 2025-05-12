import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($userId: ID!, $books: [ID!]!, $totalPrice: Float!) {
    createOrder(userId: $userId, books: $books, totalPrice: $totalPrice) {
      id
      books
      orderDate
      totalPrice
    }
  }
`;
