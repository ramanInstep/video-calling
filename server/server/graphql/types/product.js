import { gql } from 'apollo-server-express';
import ProductInputType from '../inputs/product';;

const productType = gql`
${ProductInputType}
 type Product {
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
            category: String
            status: Int
            productCategory: [Category]
            createdAt: Date
            images: [ProductImage]
            related: [Product]
            type: String
        }

        extend type Query {
            productDetail(productId: String): Product
            products(categories: String, status: Int): [Product!]
        }
        
        extend type Mutation {
            addProduct(productType: ProductInput): Product
            publish(status: Int, productId: ID): String
            delete(id: ID): String
        }
`;

export default productType;
