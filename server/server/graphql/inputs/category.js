import { gql } from 'apollo-server-express';

const categoryInput = gql`
    input CategoryInput {
            title: String!
            new: Boolean
            image: String
            parent: String
            order: Int
        }`;

export default categoryInput;