import mongoose, { Document, Schema } from "mongoose";
import { IAuthor } from "./Author";

export interface IBook extends Document {
  title: string;
  author: IAuthor;
  description?: string;
  publishedYear?: number;
  imageURL?: string;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publishedYear: Number,
  imageURL: String,
});

export default mongoose.model<IBook>("Book", BookSchema);
