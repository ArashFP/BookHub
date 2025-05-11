import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  books: mongoose.Types.ObjectId[];
  orderDate: Date;
  totalPrice: number;
}

const orderSchema = new Schema({
  books: [{ type: Schema.Types.ObjectId, ref: "Book", required: true }],
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
});

export default mongoose.model<IOrder>("Order", orderSchema);
