const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    users: [User!]!
  }
  type User {
      id: ID!
      username: String!
  }
`;

module.exports = typeDefs;