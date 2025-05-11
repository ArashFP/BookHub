import { gql } from "@apollo/client";

export const BOOKS_BY_AUTHOR_QUERY = gql`
  query BooksByAuthor($author: String, $authorId: ID) {
    booksByAuthor(author: $author, authorId: $authorId) {
      id
      title
      description
      publishedYear
      imageURL
      genre
      price
    }
  }
`;
