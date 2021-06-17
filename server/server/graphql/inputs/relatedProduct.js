import { gql } from 'apollo-server-express';

const relatedProductInput = gql`
   input RelatedProductInput {
    productId: String
    relatedProductId: String
}`;

export default relatedProductInput;