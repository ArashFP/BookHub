import { buildSchema } from "graphql";
import { bookMutations, bookQueries, bookTypes } from "./bookSchemas";
import { authorMutations, authorQueries, authorTypes } from "./authorSchemas";
import { helloQueries } from "./helloSchemas";
import { userMutations, userQueries, userTypes } from "./userSchema";
import { authTypes } from "./authSchema";
import { orderTypes, orderQueries, orderMutations } from "./orderSchemas";

const typeDefs = `
  ${bookTypes}
  ${authorTypes}
  ${userTypes}
  ${authTypes}
  ${orderTypes}

  type Query {
    ${helloQueries}
    ${bookQueries}
    ${authorQueries}
    ${userQueries}
    ${orderQueries}
  }
  
  type Mutation {
    ${bookMutations}
    ${authorMutations}
    ${userMutations}
    ${orderMutations}
  }
`;

export const schema = buildSchema(typeDefs);
