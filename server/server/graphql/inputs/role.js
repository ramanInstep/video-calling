import { gql } from 'apollo-server-express';

const roleInput = gql`
    input RoleInput {
            title: String!
            order: Int
        }`;

export default roleInput;