import { gql } from 'apollo-server-express';
import QuoteInput from '../inputs/quote';
import QuoteProduct from '../types/quoteProduct';

const quoteType = gql`
    ${QuoteProduct}
    ${QuoteInput}
    type Quote {
        _id: ID!
        firstName: String!
        lastName: String
        company: String
        email: String
        role: String
        message:String
        subscripe: Boolean
        product: [QuoteProduct]
        enterPriceLicense: License
        mvSenseLicense: License
        cloudLicense: License
    }
    
    extend type Query {
        quoteDetail(id: ID!): Quote
        quotes: [Quote!]
    }

    extend type Mutation {
        addQuote(quoteInput: QuoteInput): Quote
    }
`;

export default quoteType;
