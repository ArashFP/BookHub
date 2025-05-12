import { gql } from "@apollo/client";

export const USER_ORDERS_QUERY = gql`
  query UserOrders($userId: ID!) {
    userOrders(userId: $userId) {
      id
      books
      orderDate
      totalPrice
    }
  }
`;
