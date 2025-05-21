import mongoose from "mongoose";
import Author from "../models/Author";
import Book from "../models/Book";

export const authorResolvers = {
  authors: async () => {
    try {
      const authors = await Author.find();
      return authors.map((author) => ({
        id: author.id.toString(),
        firstName: author.firstName,
        lastName: author.lastName,
        bio: author.bio,
        birthYear: author.birthYear,
        deathYear: author.deathYear,
        books: author.books,
      }));
    } catch (error) {
      console.error("Error fetching authors:", error);
      throw new Error("Failed to fetch authors");
    }
  },

  findAuthorByBook: async (bookId: string) => {
    try {
      const author = await Author.findOne({
        books: new mongoose.Types.ObjectId(bookId),
      });
      if (!author) {
        throw new Error("Author not found for the given book");
      }
      return {
        id: author.id.toString(),
        firstName: author.firstName,
        lastName: author.lastName,
        bio: author.bio,
        birthYear: author.birthYear,
        deathYear: author.deathYear,
        books: author.books,
      };
    } catch (error) {
      console.error("Error fetching author by book:", error);
      throw new Error("Failed to fetch author by book");
    }
  },

  findAuthorByName: async (firstName: string, lastName?: string) => {
    try {
      const query: any = { firstName };
      if (lastName) {
        query.lastName = lastName;
      }

      const authors = await Author.find(query);

      if (!authors.length) {
        throw new Error("No authors found with the given name");
      }

      return authors.map((author) => ({
        id: author.id.toString(),
        firstName: author.firstName,
        lastName: author.lastName,
        bio: author.bio,
        birthYear: author.birthYear,
        deathYear: author.deathYear,
        books: author.books,
      }));
    } catch (error) {
      console.error("Error fetching author by name:", error);
      throw new Error("Failed to fetch author by name");
    }
  },
  addAuthor: async ({
    firstName,
    lastName,
    bio,
    birthYear,
    deathYear,
    books = [],
  }: {
    firstName: string;
    lastName: string;
    bio?: string;
    birthYear?: number;
    deathYear?: number;
    books?: string[];
  }) => {
    try {
      const bookObjectIds =
        books?.map((id: string) => {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`Invalid book ID: ${id}`);
          }
          return new mongoose.Types.ObjectId(id);
        }) || [];

      const author = new Author({
        firstName,
        lastName,
        bio,
        birthYear,
        deathYear,
        books: bookObjectIds,
      });
      await author.save();
      console.log("Author added successfully:", author);

      return {
        id: author.id.toString(),
        firstName: author.firstName,
        lastName: author.lastName,
        bio: author.bio,
        birthYear: author.birthYear,
        deathYear: author.deathYear,
        books: author.books,
      };
    } catch (error) {
      console.error("Error adding author:", error);
      throw new Error("Failed to add author");
    }
  },

  addBookToAuthor: async ({
    authorId,
    bookId,
  }: {
    authorId: string;
    bookId: string;
  }) => {
    try {
      const bookExists = await Book.exists({ _id: bookId });
      if (!bookExists) {
        throw new Error("Book not found");
      }

      //From GeeksForGeeks website Model.findByIdAndUpdate(id, update, options?, callback?);
      const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        { $addToSet: { books: new mongoose.Types.ObjectId(bookId) } },
        { new: true }
      );

      if (!updatedAuthor) {
        throw new Error("Author not found");
      }

      return {
        id: updatedAuthor.id.toString(),
        firstName: updatedAuthor.firstName,
        lastName: updatedAuthor.lastName,
        bio: updatedAuthor.bio,
        birthYear: updatedAuthor.birthYear,
        deathYear: updatedAuthor.deathYear,
        books: updatedAuthor.books,
      };
    } catch (error) {
      console.error("Error adding book to author:", error);
      throw new Error("Failed to add book to author");
    }
  },

  removeBookFromAuthor: async ({
    authorId,
    bookId,
  }: {
    authorId: string;
    bookId: string;
  }) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        { $pull: { books: new mongoose.Types.ObjectId(bookId) } },
        { new: true }
      );

      if (!updatedAuthor) {
        throw new Error("Author not found");
      }

      return {
        id: updatedAuthor.id.toString(),
        firstName: updatedAuthor.firstName,
        lastName: updatedAuthor.lastName,
        bio: updatedAuthor.bio,
        birthYear: updatedAuthor.birthYear,
        deathYear: updatedAuthor.deathYear,
        books: updatedAuthor.books,
      };
    } catch (error) {
      console.error("Error removing book from author:", error);
      throw new Error("Failed to remove book from author");
    }
  },
};
