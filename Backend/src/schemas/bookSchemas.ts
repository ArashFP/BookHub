export const bookTypes = `
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    publishedYear: Int
  }
`;

export const bookQueries = `
  books: [Book]
  book(id: ID!): Book
`;

export const bookMutations = `
  addBook(title: String!, author: String!, description: String, publishedYear: Int): Book
  updateBook(id: ID!, title: String, author: String, description: String, publishedYear: Int): Book
  deleteBook(id: ID!): Boolean
`;
