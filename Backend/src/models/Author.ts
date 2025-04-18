import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "./Book";

export interface IAuthor extends Document {
    firstName: string;
    lastName: string;
    bio?: string;
    birthYear?: number;
    deathYear?: number;
    books?: IBook[]; 
}

const authorSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: String,
    birthYear: Number,
    deathYear: Number,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }] 
});

export default mongoose.model<IAuthor>("Author", authorSchema);