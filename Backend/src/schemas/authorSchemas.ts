export const authorTypes = `
  type Author {
    id: ID!
    name: String!
    bio: String
    birthYear: Int
  }
`;

export const authorQueries = `
  authors: [Author]
  author(id: ID!): Author
`;

export const authorMutations = `
  addAuthor(name: String!, bio: String, birthYear: Int): Author
  updateAuthor(id: ID!, name: String, bio: String, birthYear: Int): Author
  deleteAuthor(id: ID!): Boolean
`;
