import { buildSchema } from 'graphql';
import { bookMutations, bookQueries, bookTypes } from './bookSchemas';
import { helloQueries } from './helloSchemas';

const typeDefs = `
  ${bookTypes}
  
  type Query {
    ${helloQueries}
    ${bookQueries}
  }
  
  type Mutation {
    ${bookMutations}
  }
`;

export const schema = buildSchema(typeDefs);