import { encryptPassword, authenticate, generateToken } from '../../utils';
// eslint-disable-next-line
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../../models/user');

const userResolvers = {
  Query: {
    users: async (root, args, { models: { User } }) => {
      return await UserModel.find();
    },
    user: async (root, { id }, { models: { User } }) => {
      return await UserModel.findByPk(id);
    },
  },
  Mutation: {
    register: async (root, { firstName, lastName, email, password }, { models: { User } }) => {
      try {
        console.log(email, "EMAIL::::");
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new UserModel({
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName
        });

        const result = await user.save();

        return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        console.log("error: ", err)
        throw err;
      }
    },
    login: async (root, { email, password }, { models: { User } }) => {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new Error('User does not exist!');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect!');
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        {
          expiresIn: '1h'
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    },
  },

};

export default userResolvers;
