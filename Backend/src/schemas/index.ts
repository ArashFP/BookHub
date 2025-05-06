import { buildSchema } from "graphql";
import { bookMutations, bookQueries, bookTypes } from "./bookSchemas";
import { authorMutations, authorQueries, authorTypes } from "./authorSchemas";
import { helloQueries } from "./helloSchemas";

const typeDefs = `
  ${bookTypes}
  ${authorTypes}

  type Query {
    ${helloQueries}
    ${bookQueries}
    ${authorQueries}
  }
  
  type Mutation {
    ${bookMutations}
    ${authorMutations}
  }
`;

export const schema = buildSchema(typeDefs);
