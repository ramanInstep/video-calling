import { gql } from 'apollo-server-express';

const relatedProductType = gql`
 type RelatedProduct {
            productId: String
            relatedProductId: String
        }
`;

export default relatedProductType;
