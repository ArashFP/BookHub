import mongoose, { Document, Schema } from "mongoose";
import { IOrder } from "./Order";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  orders: mongoose.Types.ObjectId[];
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export default mongoose.model<IUser>("User", userSchema);
