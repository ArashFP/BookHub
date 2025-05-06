export const userTypes = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
`;

export const userQueries = `
  users: [User]
  user(id: ID!): User
`;

export const userMutations = `
  createUser(username: String!, email: String!, password: String!): User
`;
