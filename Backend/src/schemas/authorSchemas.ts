export const authorTypes = `
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    bio: String
    birthYear: Int
    deathYear: Int
    books: [ID]
  }
`;

export const authorQueries = `
  authors: [Author]
  author(id: ID!): Author
`;

export const authorMutations = `
  addAuthor(firstName: String!, lastName: String!, bio: String, birthYear: Int, deathYear: Int, books: [ID]): Author
  updateAuthor(id: ID!, firstName: String, lastName: String, bio: String, birthYear: Int, deathYear: Int, books: [ID]): Author
  deleteAuthor(id: ID!): Boolean
`;
