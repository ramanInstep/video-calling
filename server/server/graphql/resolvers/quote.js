import QuoteModel from '../../models/quote'
import quoteInput from '../inputs/quote';
import ProductModel from '../../models/product';
import QuoteProductModel from '../../models/quoteProduct';
const fetch = require('node-fetch');

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();


const templateId = process.env.SENDIN_BLUE_TEMPLATE;
const url = process.env.SENDIN_BLUE_URL;

var sendInBlue = {
    api_key: process.env.SENDINBLUE_API_KEY
}

const sendEmail = (obj) => {
    try {
      let  sendSmtpEmail = {
            to: [{
                email: obj.email,
                name: obj.firstName
            }],
            templateId: 2,
            params: {
                rows: obj.rows,
                company:obj.company,
                firstName:obj.firstName,
                lastName:obj.lastName,
                message:obj.message,
            },
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
            }
        };

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
            console.log('API called successfully. Returned data: ' + data);
          }, function(error) {
            console.log(error);
          });
    } catch (err) {
        console.log("Email::1111 ", err);
        //return apiResponse.ErrorResponse(res, err);
    }
}

const mongoose = require('mongoose');

const quoteProduct = async (quoteId) => {
    const quoteProducts = await QuoteProductModel
        .find({ quoteId: mongoose.Types.ObjectId(quoteId) }).then().catch(err => {
            console.log("Err:: ", err);
        });

    let query = {};
    if (quoteProducts) {
        const quoteProductIds = quoteProducts.map(qp => {
            return mongoose.Types.ObjectId(qp.productId)
        })
        query = {
            _id: { $in: quoteProductIds }
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

const quoteLicense = async (quoteId) => {
    return LicenseModel.findById({ _id: mongoose.Types.ObjectId(quoteId) }).then(license => {
        return license;
    }).catch(err => {
        throw err;
    });
}

const quoteResolvers = {
    Query: {
        quotes: async (root, args, { models: { Quote } }) => {
            return await QuoteModel.find();
        },
        quoteDetail: async (root, args, { models: { Quote } }) => {
            let quote = await QuoteModel
                .findById({ _id: mongoose.Types.ObjectId(args.id) });
            const quoteProducts = await quoteProduct(args.id);
            // const enterpriceLicense = await quoteLicense(quote.id);
            // const mvSenseLicense = await quoteLicense(args.id);
            // const cloudLicense = await quoteLicense(args.id);

            quote["product"] = quoteProducts;
            // quote["enterPriceLicense"] = enterpriceLicense;
            // quote["mvSenseLicense"] = mvSenseLicense;
            // quote["cloudLicense"] = cloudLicense;

            return quote;
        },
    },
    Mutation: {
        addQuote: async (root, { quoteInput }, { models: { Quote } }) => {
            console.log("PRODUCT:: ");
            try {
                const quote = new QuoteModel({
                    firstName: quoteInput.firstName,
                    lastName: quoteInput.lastName,
                    company: quoteInput.company,
                    email: quoteInput.email,
                    role: quoteInput.role,
                    message: quoteInput.message,
                    subscribe: quoteInput.subscribe
                });

                const products = quoteInput.products;

                return await quote.save().then(result => {
                    const quoteResult = { ...result._doc };

                    let productsQuotes = []
                    const quoteProducts = products && products.map(async (prod) => {
                        let productDetail = await ProductModel.findById({ _id: mongoose.Types.ObjectId(prod.productId) }).then().catch(err => {
                            console.log(err, 'sdfsdfs')
                        });
                        console.log(productDetail, 'productDetailproductDetail');
                        productDetail['quantity'] = prod.quantity
                        productsQuotes.push(productDetail)

                        return new QuoteProductModel({
                            productId: prod.productId,
                            quoteId: quoteResult._id,
                            quantity: prod.quantity,
                            total: prod.total,
                            enterpriceLicense: prod.enterpriceLicense,
                            mvSenseLicense: prod.mvSenseLicense,
                            cloudLicense: prod.cloudLicense
                        });
                    });

                    QuoteProductModel.insertMany(quoteProducts).then(async (res) => {
                        let html = await getRowTemplate(productsQuotes);
                        let obj = {email:quoteInput.email,rows: html,message:quoteInput.message,
                            company:quoteInput.company,
                            firstName: quoteInput.firstName,
                            lastName: quoteInput.lastName}
                        sendEmail(obj);
                    }).catch(err => {
                        throw err;
                    });

                    return quoteResult;
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
            } catch (err) {
                console.log("error: ", err)
                throw err;
            }
        },
    },
};


const getRowTemplate = async (products) => {
    let row = '';
    products.map((item, i) => {
        row += `<tr><tdstyle="padding: 15px; text-align:left"><table style="width: 100%;"><tr><td>
        <img style="width: 200px" src=${item.heroImage}></td>
        <td style=""><span style="font-size: 12px; font-weight:bold;">${item.code}</span><br><p style="font-size: 12px;">${item.shortDescription}</p></td><td 
        style="text-align: right;">${item.price}</td><td 
        style="text-align: right;">${item.quantity}</td><td style="text-align: right;">${item.quantity * item.price}</td></tr></table></td></tr>`;
    });
    console.log(row, 'rowrow');
    return row;
}
export default quoteResolvers;
