import { gql } from 'apollo-server-express';

const userType = gql`
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    active: Boolean
  }
  type UserAuth {
    token: String
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
  }
`;

export default userType;
