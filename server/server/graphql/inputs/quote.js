import { gql } from 'apollo-server-express';
import QuoteProductInput from '../inputs/quoteProduct';
const quoteInput = gql`
    ${QuoteProductInput}
   input QuoteInput {
            firstName: String!
            lastName: String!
            email: String
            company: String
            role: String
            message: String
            subscribe: Boolean
            products: [QuoteProductInput]
        }`;

export default quoteInput;