import { gql } from 'apollo-server-express';

const productImageType = gql`
 type ProductImage {
            productId: String
            thumbnail: String
            large: String
        }
`;

export default productImageType;
