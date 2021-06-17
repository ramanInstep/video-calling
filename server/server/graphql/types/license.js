import { gql } from 'apollo-server-express';
import LicenseInput from '../inputs/license';

const licenseType = gql`
${LicenseInput}
 type License {
            _id: ID!
            name: String!
            required: Boolean
            url: String
            type: String
            description: String
            order: Int
            price: Float
            tooltipDescription: String

        }

    extend type Query {
        license(id: ID!): License
        licenses(type: String): [License!]
    }

    extend type Mutation {
        addLicense(licenseInput: LicenseInput): License
        updateLicense(tooltipDescription: String, licenseId: ID): String
    }
`;

export default licenseType;
