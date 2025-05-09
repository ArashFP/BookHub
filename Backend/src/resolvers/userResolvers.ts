import User from "../models/User";

export const userResolvers = {
  users: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  },

  user: async ({ id }: { id: string }) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  },

  createUser: async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
  updateUser: async ({
    id,
    username,
    email,
    password,
  }: {
    id: string;
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true }
      );
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  },
};
