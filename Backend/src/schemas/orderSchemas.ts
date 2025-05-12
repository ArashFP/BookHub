export const orderTypes = `
  type Order {
    id: ID!
    books: [ID!]!
    orderDate: String!
    totalPrice: Float!
  }
`;

export const orderQueries = `
  orders: [Order]
  order(id: ID!): Order
`;

export const orderMutations = `
  createOrder(userId: ID!, books: [ID!]!, totalPrice: Float!): Order
  updateOrder(id: ID!, books: [ID!], totalPrice: Float): Order
  deleteOrder(id: ID!): Boolean
`;
