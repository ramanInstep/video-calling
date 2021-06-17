import { gql } from 'apollo-server-express';

const upsaleProductInput = gql`
   input UpsaleProductInput {
            code: String!
            title: String!
            SKU: String
            description: String
            price: Float
            shortDescription: String
            datasheet: String
            overview: String
            specification: String
            new: Boolean
            heroImage: String
            status: Int
        }`;

export default upsaleProductInput;