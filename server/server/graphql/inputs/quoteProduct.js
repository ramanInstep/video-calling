import { gql } from 'apollo-server-express';

const quoteProductInput = gql`
   input QuoteProductInput {
        productId: String!
        quoteId: String
        quantity: Int
        total: Float
        enterpriceLicense: String
        mvSenseLicense: String
        cloudLicense: String
    }`;

export default quoteProductInput;