import { buildSchema } from "graphql";
import { bookMutations, bookQueries, bookTypes } from "./bookSchemas";
import { authorMutations, authorQueries, authorTypes } from "./authorSchemas";
import { helloQueries } from "./helloSchemas";
import { userMutations, userQueries, userTypes } from "./userSchema";
import { authTypes } from "./authSchema";

const typeDefs = `
  ${bookTypes}
  ${authorTypes}
  ${userTypes}
  ${authTypes}
  

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
