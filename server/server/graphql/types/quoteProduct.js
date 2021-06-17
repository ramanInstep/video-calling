import { gql } from 'apollo-server-express';

const quoteProductType = gql`
    type QuoteProduct {
        _id: ID!
        productId: String!
        quoteId: String
        quantity: Int
        total: Float
        enterpriceLicense: String
        mvSenseLicense:String
        cloudLicense: String
    }
`;

export default quoteProductType;
