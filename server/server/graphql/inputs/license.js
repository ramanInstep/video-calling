import { gql } from 'apollo-server-express';

const licenseInput = gql`
    input LicenseInput {
            name: String!
            required: Boolean
            url: String
            type:String
            price: Float
            description: String
            order: Int
            tooltipDescription: String

        }`;

export default licenseInput;