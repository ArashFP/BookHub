import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publishedYear: Number
});

export default mongoose.model<IBook>('Book', BookSchema);