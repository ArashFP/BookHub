import User from "../models/User";
import { generateToken } from "../middleware/loginJWT";

export const authResolvers = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      if (user.password !== password) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken({ userId: user.id, email: user.email });

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  },
};
