import { gql } from 'apollo-server-express';
import RoleInput from '../inputs/role';

const roleType = gql`
    ${RoleInput}
    type Role {
        _id: ID!
        title: String
        order: Int
    }
    
    extend type Query {
        role(id: ID!): Role
        roles: [Role!]
    }

    extend type Mutation {
        addRole(role: RoleInput): Role
        deleteRole(id: String): String
    }
`;

export default roleType;
