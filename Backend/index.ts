import express, { Response, Request } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import cors from "cors";
import { bookResolvers, helloResolver } from "./src/resolvers/bookResolvers";
import { schema } from "./src/schemas";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ruruHTML } from "ruru/server";
import { authorResolvers } from "./src/resolvers/authorResolvers";
import { userResolvers } from "./src/resolvers/userResolvers";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bookhub";
const PORT = process.env.PORT || 1337;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

const root = {
  ...helloResolver,
  ...bookResolvers,
  ...authorResolvers,
  ...userResolvers,
};

const app = express();

app.use(cors());

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
  })
);

app.get("/", (_req: Request, res: Response) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
  console.log(`Access RURU IDE at http://localhost:${PORT}`);
});
