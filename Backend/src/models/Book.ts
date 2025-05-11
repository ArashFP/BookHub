import mongoose, { Document, Schema } from "mongoose";
import { IAuthor } from "./Author";

export interface IBook extends Document {
  title: string;
  author: IAuthor;
  authorId?: mongoose.Types.ObjectId;
  description?: string;
  publishedYear?: number;
  imageURL?: string;
  genre?: string;
  price: number;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "Author" },
  description: String,
  publishedYear: Number,
  imageURL: String,
  genre: [{ type: String }],
  price: Number,
});

export default mongoose.model<IBook>("Book", BookSchema);
