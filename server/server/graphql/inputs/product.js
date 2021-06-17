import { gql } from 'apollo-server-express';
import ProductImageInput from '../inputs/productImage';
import RelatedProductInput from '../inputs/relatedProduct';

const productTypeInput = gql`
${ProductImageInput}
${RelatedProductInput}
   input ProductInput {
            code: String!
            title: String!
            SKU: String
            description: String
            price: Float
            shortDescription: String
            datasheet: String
            overview: String
            specification: String
            new: Boolean
            heroImage: String
            category: String
            status: Int
            type: String
            images: [ProductImageInput]
            relatedProduct: [RelatedProductInput]
            categories: [String]
            licenses: [String]
            isPopular: Boolean
        }`;

export default productTypeInput;