import mongoose from "mongoose";
import Book from "../models/Book";
import Author from "../models/Author";

export const bookResolvers = {
  books: async () => {
    try {
      const books = await Book.find();
      return books.map((book) => ({
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      }));
    } catch (error) {
      console.error("Error fetching books:", error);
      throw new Error("Failed to fetch books");
    }
  },

  book: async ({ id }: { id: string }) => {
    try {
      const book = await Book.findById(id);
      if (!book) return null;

      return {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      };
    } catch (error) {
      console.error("Error fetching book:", error);
      throw new Error("Failed to fetch book");
    }
  },

  addBook: async ({
    title,
    author,
    authorId,
    description,
    publishedYear,
    imageURL,
    genre,
    price,
  }: {
    title: string;
    author: string;
    authorId: string;
    description?: string;
    publishedYear?: number;
    imageURL?: string;
    genre?: string;
    price?: number;
  }) => {
    try {
      const bookData = new Book({
        title,
        author,
        description,
        publishedYear,
        imageURL,
        genre,
        price,
      });

      if (authorId && mongoose.Types.ObjectId.isValid(authorId)) {
        bookData.authorId = new mongoose.Types.ObjectId(authorId);

        await Author.findByIdAndUpdate(authorId, {
          $addToSet: { books: bookData._id },
        });
      }

      const book = new Book(bookData);

      await book.save();
      console.log("book added", book);

      return {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      };
    } catch (error) {
      console.error("Error adding book:", error);
      throw new Error("Failed to add book");
    }
  },

  updateBook: async ({
    id,
    title,
    author,
    authorId,
    description,
    publishedYear,
    imageURL,
    genre,
    price,
  }: {
    id: string;
    title?: string;
    author?: string;
    authorId?: string;
    description?: string;
    publishedYear?: number;
    imageURL?: string;
    genre?: string;
    price?: number;
  }) => {
    try {
      const updates: { [key: string]: any } = {};
      if (title !== undefined) updates.title = title;
      if (author !== undefined) updates.author = author;
      if (description !== undefined) updates.description = description;
      if (publishedYear !== undefined) updates.publishedYear = publishedYear;
      if (imageURL !== undefined) updates.imageURL = imageURL;
      if (genre !== undefined) updates.genre = genre;
      if (price !== undefined) updates.price = price;

      const originalBook = await Book.findById(id);
      if (!originalBook) return null;

      if (
        authorId !== undefined &&
        authorId !== originalBook.authorId?.toString()
      ) {
        if (mongoose.Types.ObjectId.isValid(authorId)) {
          updates.authorId = new mongoose.Types.ObjectId(authorId);

          if (originalBook.authorId) {
            await Author.findByIdAndUpdate(originalBook.authorId, {
              $pull: { books: originalBook._id },
            });
          }

          await Author.findByIdAndUpdate(authorId, {
            $addToSet: { books: originalBook._id },
          });
        }
      }

      const book = await Book.findByIdAndUpdate(id, updates, { new: true });
      if (!book) return null;

      return {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      };
    } catch (error) {
      console.error("Error updating book:", error);
      throw new Error("Failed to update book");
    }
  },

  deleteBook: async ({ id }: { id: string }) => {
    try {
      const book = await Book.findById(id);
      if (!book) return false;

      if (book.authorId) {
        await Author.findByIdAndUpdate(book.authorId, {
          $pull: { books: book._id },
        });
      }

      const result = await Book.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw new Error("Failed to delete book");
    }
  },

  booksByAuthor: async ({
    author,
    authorId,
  }: {
    author?: string;
    authorId?: string;
  }) => {
    try {
      const query: { [key: string]: any } = {};

      if (author) {
        query.author = author;
      }

      if (authorId && mongoose.Types.ObjectId.isValid(authorId)) {
        query.authorId = new mongoose.Types.ObjectId(authorId);
      }

      if (!author && !authorId) {
        throw new Error("Either author name or authorId must be provided");
      }

      const books = await Book.find(query);
      return books.map((book) => ({
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      }));
    } catch (error) {
      console.error("Error fetching books by author:", error);
      throw new Error("Failed to fetch books by author");
    }
  },

  booksByGenre: async ({ genre }: { genre: string }) => {
    try {
      const books = await Book.find({ genre: genre });
      return books.map((book) => ({
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      }));
    } catch (error) {
      console.error("Error fetching books by genre:", error);
      throw new Error("Failed to fetch books by genre");
    }
  },

  booksByGenres: async ({ genres }: { genres: [string] }) => {
    try {
      const books = await Book.find({ genre: { $in: genres } });
      return books.map((book) => ({
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
        imageURL: book.imageURL,
        genre: book.genre,
        price: book.price,
      }));
    } catch (error) {
      console.error("Error fetching books by genres:", error);
      throw new Error("Failed to fetch books by genres");
    }
  },
};

export const helloResolver = {
  hello: () => "Hello world!",
};
