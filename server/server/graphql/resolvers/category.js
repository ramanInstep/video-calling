import { Mongoose } from 'mongoose';

const CategoryModel = require('../../models/category');
const categoryType = require('../inputs/category');
const mongoose = require('mongoose');

const categoryResolvers = {
  Query: {
    categories: async (root, args, { models: { Category } }) => {

      const categories = await CategoryModel.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'parent',
            as: 'firstSubCategories'
          }
        },
        {
          $unwind: {
            path: "$firstSubCategories",
            preserveNullAndEmptyArrays: true
          },
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            type: { $first: '$type' },
            new: { $first: '$new' },
            image: { $first: '$image' },
            parent: { $first: '$parent' },
            order: { $first: '$order' },
            subCategories: { $push: '$firstSubCategories' }
          }
        },
        {
          $sort: {
            order: 1
          }
        }
      ]);

      const secondCategories = await CategoryModel.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'parent',
            as: 'firstSubCategories'
          }
        },
        {
          $unwind: {
            path: "$firstSubCategories",
            preserveNullAndEmptyArrays: true
          },
        },

        {
          $lookup: {
            from: 'categories',
            localField: 'firstSubCategories._id',
            foreignField: 'parent',
            as: 'secondSubCategories'
          }
        },
        {
          $unwind: {
            path: "$secondSubCategories",
            preserveNullAndEmptyArrays: true
          },
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            type: { $first: '$type' },
            new: { $first: '$new' },
            image: { $first: '$image' },
            parent: { $first: '$parent' },
            order: { $first: '$order' },
            secondSubCategories: { $push: '$secondSubCategories' },
          }
        }
      ]);

      const thirdCategories = await CategoryModel.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'parent',
            as: 'firstSubCategories'
          }
        },
        {
          $unwind: {
            path: "$firstSubCategories",
            preserveNullAndEmptyArrays: true
          },
        },

        {
          $lookup: {
            from: 'categories',
            localField: 'firstSubCategories._id',
            foreignField: 'parent',
            as: 'secondSubCategories'
          }
        },
        {
          $unwind: {
            path: "$secondSubCategories",
            preserveNullAndEmptyArrays: true
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'secondSubCategories._id',
            foreignField: 'parent',
            as: 'thirdSubCategories'
          }
        },
        {
          $unwind: {
            path: "$thirdSubCategories",
            preserveNullAndEmptyArrays: true
          },
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            type: { $first: '$type' },
            new: { $first: '$new' },
            image: { $first: '$image' },
            parent: { $first: '$parent' },
            order: { $first: '$order' },
            thirdSubCategories: { $push: '$thirdSubCategories' },
          }
        }
      ]);

      let resultCategories = categories.filter(cat => cat.parent === null);

      let resultSecondCategories = secondCategories.filter(cat => cat.parent === null);

      let resultThirdCategories = thirdCategories.filter(cat => cat.parent === null);

      let finalCategory = resultCategories.map(category => {

        let secondSubCategory = resultSecondCategories.filter(data => JSON.stringify(data._id) == JSON.stringify(category._id));
        let thirdSubCategory = resultThirdCategories.filter(data => JSON.stringify(data._id) == JSON.stringify(category._id));
        category.subCategories.map(subcat => {
          if (secondSubCategory && secondSubCategory.length > 0) {
            let secondSubCat = secondSubCategory[0].secondSubCategories.filter(data => JSON.stringify(data.parent) == JSON.stringify(subcat._id));
            if (secondSubCat && secondSubCat.length > 0) {
              subcat['subCategories'] = secondSubCat;
              secondSubCat.map(thirdSub => {
                let thirdSubCat = thirdSubCategory[0].thirdSubCategories.filter(data => JSON.stringify(data.parent) == JSON.stringify(thirdSub._id));
                if (thirdSubCat && thirdSubCat.length > 0) {
                  thirdSub['subCategories'] = thirdSubCat;
                }
              })
            }
          }

        })
        return category;
      })

      return finalCategory.filter(cat => cat.parent === null);
    },
    category: async (root, { id }, { models: { Category } }) => {
      return await CategoryModel.findByPk(id)
    },
  },
  Mutation: {
    addCategory: async (root, { category }, { models: { Category } }) => {
      try {
        console.log("cate:: ", category)
        // const existingCategory = await CategoryModel.findOne({ title: category.title });
        // if (existingCategory) {
        //   throw new Error('Category exists already.');
        // }

        const categoryModel = new CategoryModel({
          title: category.title,
          type: category.type,
          new: category.new,
          image: category.image,
          parent: category.parent,
          order: category.order
        });

        const result = await categoryModel.save();

        return { ...result._doc, _id: result.id };
      } catch (err) {
        console.log("error: ", err)
        throw err;
      }
    },
  },
};

export default categoryResolvers;
