

import { gql } from 'apollo-server-express';

const durationInput = gql`
   input DurationInput {
    name: String!
}`;

export default durationInput;