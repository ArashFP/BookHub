export interface Book {
  id?: string;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  imageURL?: string;
  genre?: string[];
  price?: number;
}
