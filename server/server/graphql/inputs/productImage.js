import { gql } from 'apollo-server-express';

const productImageInput = gql`
  input ProductImageInput {
            productId: String
            thumbnail: String
            large: String
        }`;

export default productImageInput;