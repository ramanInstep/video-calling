// @flow
import { gql } from 'apollo-server-express';
import userTypes from '../types/user';
import productTypes from '../types/product';
import licenseTypes from '../types/license';
import categoryTypes from '../types/category';
import productImageTypes from '../types/productImage';
import relatedProductTypes from '../types/relatedProduct';
import durationTypes from '../types/duration';
import quoteTypes from '../types/quote';
import upsaleType from '../types/upsaleProduct';
import roleType from '../types/role';


// const gql = require('graphql-tag')
const { buildASTSchema } = require('graphql')

const queryTypes = gql`
  scalar Date

  directive @capitalize on FIELD_DEFINITION
  directive @date(
    defaultFormat: String = "MMMM Do YYYY"
  ) on FIELD_DEFINITION

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const combinedTypes = [
  userTypes, 
  queryTypes, 
  productTypes, 
  licenseTypes, 
  categoryTypes, 
  productImageTypes, 
  relatedProductTypes,
  durationTypes,
  quoteTypes,
  upsaleType,
  roleType
];

export default combinedTypes;
