const ProductModel = require('../../models/product');
const productType = require('../inputs/product');
const ProductImage = require('../../models/productImage');
const RelatedProduct = require('../../models/relatedProduct');
const ProductCategories = require('../../models/productCategories');
const ProductLicenses = require('../../models/productLicenses');
const mongoose = require('mongoose');

const productImage = async (productId) => {
    console.log("ProductID:: ", productId);
    return await ProductImage
        .find({ productId: mongoose.Types.ObjectId(productId) }).then().catch(err => {
            console.log("Err:: ", err);
        });
}

const relatedProduct = async (productId) => {
    const releatedProduct = await RelatedProduct
        .find({ productId: mongoose.Types.ObjectId(productId) }).then().catch(err => {
            console.log("Err:: ", err);
        });
    let query = {};
    if (releatedProduct) {
        const relatedProductIds = releatedProduct.map(releated => {
            return mongoose.Types.ObjectId(releated.relatedProductId)
        })
        query = {
            _id: { $in: relatedProductIds }
        }
    }
    return ProductModel.find(query).then(products => {
        return products.map(product => {
            return { ...product._doc }
        });
    }).catch(err => {
        throw err;
    });
}

const productResolvers = {
    Query: {
        products: async (root, args, { models: { Product } }) => {
            let categories = [];

            let resultQuery = [
                {
                    $lookup: {
                        from: 'productcategories',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'categories'
                    }
                }, {
                    $unwind: {
                        path: '$categories',
                        preserveNullAndEmptyArrays: true
                    }
                },

                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categories.categoryId',
                        foreignField: '_id',
                        as: 'productCategory'
                    }
                }, {
                    $unwind: {
                        path: '$productCategory',
                        preserveNullAndEmptyArrays: true
                    }
                }
            ];

            if (args && args.categories) {
                categories = args.categories.split(',').map(category => {
                    return mongoose.Types.ObjectId(category.replace(/ /g, ""))
                });

                resultQuery.push({
                    $match: {
                        $and: [{
                            'categories.categoryId': { $in: categories }
                        }]
                    }
                })
            }

            if (args.status > -1) {
                resultQuery.push({
                    $match: {
                        status: { $eq: args.status }
                    }
                })
            }
            let project = {
                $group: {
                    _id: '$_id',
                    code: { $first: '$code' },
                    title: { $first: '$title' },
                    SKU: { $first: '$SKU' },
                    price: { $first: '$price' },
                    description: { $first: '$description' },
                    shortDescription: { $first: '$shortDescription' },
                    datasheet: { $first: '$datasheet' },
                    overview: { $first: '$overview' },
                    specification: { $first: '$specification' },
                    new: { $first: '$new' },
                    heroImage: { $first: '$heroImage' },
                    status: { $first: '$status' },
                    createdAt: { $first: '$createdAt' },
                    productCategory: {
                        $push: '$productCategory'
                    }
                }
            };
            resultQuery.push(project)
            console.log(JSON.stringify(resultQuery));

            var result = await ProductModel.aggregate(resultQuery);
            console.log(JSON.stringify(result), 'resultresult')
            return result;
        },
        productDetail: async (root, args, { models: { Product } }) => {
            let product = await ProductModel
                .findById({ _id: mongoose.Types.ObjectId(args.productId) });
            const images = await productImage(args.productId);
            const related = await relatedProduct(args.productId);
            console.log(related, 'relatedrelatedrelated')
            product["images"] = images;
            product["related"] = related;
            return product;
        },
    },
    Mutation: {
        addProduct: async (root, { productType }, { models: { Product } }) => {
            try {
                const product = new ProductModel({
                    code: productType.code,
                    title: productType.title,
                    description: productType.description,
                    shortDescription: productType.shortDescription,
                    datasheet: productType.datasheet,
                    overview: productType.overview,
                    specification: productType.specification,
                    new: productType.new,
                    heroImage: productType.heroImage,
                    category: productType.category,
                    SKU: productType.SKU,
                    price: productType.price,
                    status: productType.status,
                    type: productType.type,
                    isPopular: productType.isPopular,
                });

                const images = productType.images;
                const relatedProduct = productType.relatedProduct;

                return await product.save().then(result => {
                    const productResult = { ...result._doc };
                    const productImages = images && images.map(image => {
                        return new ProductImage({
                            thumbnail: image.thumbnail,
                            large: image.large,
                            productId: productResult._id,
                        });
                    });

                    ProductImage.insertMany(productImages).then(res => {
                    }).catch(err => {
                        throw error;
                    });

                    const related = relatedProduct && relatedProduct.map(prod => {
                        return new RelatedProduct({
                            productId: productResult._id,
                            relatedProductId: prod.relatedProductId
                        });
                    });

                    RelatedProduct.insertMany(related).then(res => {

                    }).catch(err => {
                        throw error;
                    });

                    const category = productType.categories;

                    const categories = category && category.map(cat => {
                        return new ProductCategories({
                            productId: productResult._id,
                            categoryId: cat
                        });
                    });
                    ProductCategories.insertMany(categories).then(res => {

                    }).catch(err => {
                        throw error;
                    });

                    const license = productType.licenses;

                    const licenses = license && license.map(lic => {
                        return new ProductLicenses({
                            productId: productResult._id,
                            licenseId: lic
                        });
                    });
                    ProductLicenses.insertMany(licenses).then(res => {

                    }).catch(err => {
                        throw error;
                    });

                    return productResult;
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
            } catch (err) {
                console.log("error: ", err)
                throw err;
            }
        },
        publish: async (root, args, { models: { Product } }) => {
            // console.log(args);
            return await ProductModel.updateOne({ _id: mongoose.Types.ObjectId(args.productId) }, { status: args.status },
                { upsert: true }).then(response => {
                    console.log(response);
                    return args.productId;
                }).catch(error => {
                    throw error;
                })
        },
        delete: async (root, args, { models: { Product } }) => {
            // console.log(args);
            return await ProductModel.deleteOne({ _id: mongoose.Types.ObjectId(args.id) }).then(response => {
                console.log(response);
                return args.id;
            }).catch(error => {
                throw error;
            })
        },
    },
};

export default productResolvers;
