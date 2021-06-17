import { gql } from 'apollo-server-express';
import UpsaleProductInput from '../inputs/upsaleProduct';;

const upsaleProductType = gql`
${UpsaleProductInput}
 type UpsaleProduct {
            _id: ID! 
            code: String!
            title: String!
            SKU: String
            price: Float
            description: String
            shortDescription: String
            datasheet: String
            overview: String
            specification: String
            new: Boolean
            heroImage: String
            createdAt: Date
        }

        extend type Query {
            upsales: [UpsaleProduct!]
        }
        
        extend type Mutation {
            addUpsaleProduct(productType: UpsaleProductInput): UpsaleProduct
            deleteUpsale(id: ID): String
        }
`;

export default upsaleProductType;
