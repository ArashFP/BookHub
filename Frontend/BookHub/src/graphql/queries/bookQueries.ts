import { gql } from "@apollo/client";

export const BOOKS_BY_AUTHOR_QUERY = gql`
  query BooksByAuthor($author: String!) {
    booksByAuthor(author: $author) {
      title
      description
      publishedYear
      imageURL
    }
  }
`;
