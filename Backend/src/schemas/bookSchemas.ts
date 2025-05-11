export const bookTypes = `
  type Book {
    id: ID!
    title: String!
    author: String!
    authorId: ID
    description: String
    publishedYear: Int
    imageURL: String
    genre: [String]
    price: Float
  }
`;

export const bookQueries = `
  books: [Book]
  book(id: ID!): Book
  booksByAuthor(author: String, authorId: ID): [Book]
    booksByGenre(genre: String!): [Book] 
  booksByGenres(genres: [String]!): [Book] 
`;

export const bookMutations = `
  addBook(
    title: String!, 
    author: String!, 
    authorId: ID,
    description: String, 
    publishedYear: Int, 
    imageURL: String, 
    genre: [String],
    price: Float
  ): Book
  
  updateBook(
    id: ID!, 
    title: String, 
    author: String, 
    authorId: ID,
    description: String, 
    publishedYear: Int, 
    imageURL: String, 
    genre: [String],
    price: Float
  ): Book
  
  deleteBook(id: ID!): Boolean
`;
