export const bookTypes = `
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    publishedYear: Int
    imageURL: String
  }
`;

export const bookQueries = `
  books: [Book]
  book(id: ID!): Book
  booksByAuthor(author: String!): [Book]
`;

export const bookMutations = `
  addBook(title: String!, author: String!, description: String, publishedYear: Int, imageURL: String): Book
  updateBook(id: ID!, title: String, author: String, description: String, publishedYear: Int, imageURL: String): Book
  deleteBook(id: ID!): Boolean
`;
