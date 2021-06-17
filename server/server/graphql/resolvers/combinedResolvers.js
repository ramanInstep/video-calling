import userResolvers from './user';
import productResolvers from './product';
import licenseResolvers from './license';
import categoryResolvers from './category';
import durationResolvers from './duration';
import upsaleProduct from './upsaleProduct';
import { dateScalarType } from '../scalars';
import quoteResolver from './quote';
import roleResolver from './role';

export default [
    dateScalarType, 
    userResolvers, 
    productResolvers, 
    licenseResolvers, 
    categoryResolvers, 
    durationResolvers, 
    quoteResolver,
    upsaleProduct,
    roleResolver
];
