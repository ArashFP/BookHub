import Order from "../models/Order";
import User from "../models/User";
import mongoose from "mongoose";

export const orderResolvers = {
  orders: async () => {
    try {
      return await Order.find();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
  },

  order: async ({ id }: { id: string }) => {
    try {
      return await Order.findById(id);
    } catch (error) {
      console.error("Error fetching order:", error);
      throw new Error("Failed to fetch order");
    }
  },

  createOrder: async ({
    userId,
    books,
    totalPrice,
  }: {
    userId: string;
    books: string[];
    totalPrice: number;
  }) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(
          "User not found. Cannot create order without a valid user."
        );
      }

      const order = new Order({ books, totalPrice });
      await order.save();

      user.orders.push(order._id as mongoose.Types.ObjectId);
      await user.save();

      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order");
    }
  },

  updateOrder: async ({
    id,
    books,
    totalPrice,
  }: {
    id: string;
    books?: string[];
    totalPrice?: number;
  }) => {
    try {
      const updates: { [key: string]: any } = {};
      if (books) updates.books = books;
      if (totalPrice) updates.totalPrice = totalPrice;

      return await Order.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Failed to update order");
    }
  },

  deleteOrder: async ({ id }: { id: string }) => {
    try {
      const result = await Order.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Failed to delete order");
    }
  },
};
