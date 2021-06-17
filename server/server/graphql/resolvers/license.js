const LicenseModel = require('../../models/license');
const licenseInput = require('../inputs/license');
const mongoose = require('mongoose');
const licenseResolvers = {
    Query: {
        licenses: async (root, args, { models: { License } }) => {
            console.log(args,'args.type--')
            let query = {};
            if(args.type){
                query = {type: args.type} 
            }
            return await LicenseModel.find(query).sort( { "order": 1 } );
        },
        license: async (root, { id }, { models: { License } }) => {
            return await LicenseModel.findByPk(id);
        },
    },
    Mutation: {
        addLicense: async (root, { licenseInput }, { models: { License } }) => {
            try {
                console.log(licenseInput,'licenseInputlicenseInput')
                const existingLicense = await LicenseModel.findOne({ name: licenseInput.name });
                if (existingLicense) {
                    throw new Error('License exists already.');
                }

                const license = new LicenseModel({
                    name: licenseInput.name,
                    required: licenseInput.required,
                    url: licenseInput.url,
                    type: licenseInput.type,
                    description: licenseInput.description,
                    price: licenseInput.price,
                    order: licenseInput.order,
                    tooltipDescription: licenseInput.tooltipDescription,
                });

                const result = await license.save();

                return { ...result._doc, _id: result.id };
            } catch (err) {
                console.log("error: ", err)
                throw err;
            }
        },
        updateLicense: async (root, args, { models: { License } }) => {
            try {
                console.log(args,'argsargs')
                return await LicenseModel.updateOne({ _id: mongoose.Types.ObjectId(args.licenseId) }, { tooltipDescription: args.tooltipDescription },
                { upsert: true }).then(response => {
                    console.log(response);
                    return args.licenseId;
                }).catch(error => {
                    throw error;
                }) 
            } catch (err) {
                console.log("error: ", err)
                throw err;
            }
        },
    },
};

export default licenseResolvers;
