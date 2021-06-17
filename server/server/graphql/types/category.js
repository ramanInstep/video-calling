import { gql } from 'apollo-server-express';
import CategoryInput from '../inputs/category';

const categoryType = gql`
    ${CategoryInput}
    type Category {
        _id: ID!
        type: String
        title: String
        new: Boolean
        image: String
        parent: String
        subCategories:[Category]
        order: Int
    }
    
    extend type Query {
        category(id: ID!): Category
        categories: [Category!]
    }

    extend type Mutation {
        addCategory(category: CategoryInput): Category
    }
`;

export default categoryType;
