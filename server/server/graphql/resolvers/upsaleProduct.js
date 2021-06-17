const UpsaleProductModel = require('../../models/upsaleProduct');
const mongoose = require('mongoose');

const upsaleProductResolvers = {
    Query: {
        upsales: async (root, args, { models: { Product } }) => {
            return await UpsaleProductModel.find();
        }
    },
    Mutation: {
        addUpsaleProduct: async (root, { productType }, { models: { Product } }) => {
            try {
                console.log(productType);
                const product = new UpsaleProductModel({
                    code: productType.code,
                    title: productType.title,
                    description: productType.description,
                    shortDescription: productType.shortDescription,
                    datasheet: productType.datasheet,
                    overview: productType.overview,
                    specification: productType.specification,
                    new: productType.new,
                    heroImage: productType.heroImage,
                    SKU: productType.SKU,
                    price: productType.price,
                    status: productType.status
                });

                return await product.save().then(result => {
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
            } catch (err) {
                console.log("error: ", err)
                throw err;
            }
        },
        delete: async (root, args, { models: { Product } }) => {
            // console.log(args);
            return await UpsaleProductModel.deleteOne({ _id: mongoose.Types.ObjectId(args.id) }).then(response => {
                console.log(response);
                return args.id;
            }).catch(error => {
                throw error;
            })
        },
    },
};

export default upsaleProductResolvers;
