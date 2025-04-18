import Book from '../models/Book';

export const bookResolvers = {
  books: async () => {
    try {
      const books = await Book.find();
      return books.map(book => ({
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        description: book.description,
        publishedYear: book.publishedYear
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books');
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
        description: book.description,
        publishedYear: book.publishedYear
      };
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  },
  
  addBook: async ({ title, author, description, publishedYear }: { 
    title: string, 
    author: string, 
    description?: string, 
    publishedYear?: number 
  }) => {
    try {
      const book = new Book({ title, author, description, publishedYear });
      await book.save();
      console.log("book added", book)
      
      return {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        description: book.description,
        publishedYear: book.publishedYear
      };
    } catch (error) {
      console.error('Error adding book:', error);
      throw new Error('Failed to add book');
    }
  },
  
  updateBook: async ({ id, title, author, description, publishedYear }: { 
    id: string, 
    title?: string, 
    author?: string, 
    description?: string, 
    publishedYear?: number 
  }) => {
    try {
      const updates: {[key: string]: any} = {};
      if (title !== undefined) updates.title = title;
      if (author !== undefined) updates.author = author;
      if (description !== undefined) updates.description = description;
      if (publishedYear !== undefined) updates.publishedYear = publishedYear;

      const book = await Book.findByIdAndUpdate(id, updates, { new: true });
      if (!book) return null;

      return {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        description: book.description,
        publishedYear: book.publishedYear
      };
    } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Failed to update book');
    }
  },
  
  deleteBook: async ({ id }: { id: string }) => {
    try {
      const result = await Book.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book');
    }
  }
};

export const helloResolver = {
  hello: () => "Hello world!"
};