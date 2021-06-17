import { gql } from 'apollo-server-express';

const durationType = gql`
  type Duration {
      _id: ID!
      name: String!
  }

  extend type Query {
    duration(id: ID!): Duration
    durations: [Duration!]
  }

  extend type Mutation {
    addDuration(name: String!): Duration
  }

`;

export default durationType;
