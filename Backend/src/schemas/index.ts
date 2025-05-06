import { buildSchema } from "graphql";
import { bookMutations, bookQueries, bookTypes } from "./bookSchemas";
import { authorMutations, authorQueries, authorTypes } from "./authorSchemas";
import { helloQueries } from "./helloSchemas";
import { userMutations, userQueries, userTypes } from "./userSchema";

const typeDefs = `
  ${bookTypes}
  ${authorTypes}
  ${userTypes}
  

  type Query {
    ${helloQueries}
    ${bookQueries}
    ${authorQueries}
    ${userQueries}
  }
  
  type Mutation {
    ${bookMutations}
    ${authorMutations}
    ${userMutations}
  }
`;

export const schema = buildSchema(typeDefs);
