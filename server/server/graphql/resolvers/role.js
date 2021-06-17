const RoleModel = require('../../models/roles');

const roleResolvers = {
  Query: {
    roles: async (root, args, { models: { Role } }) => {
      return await RoleModel.find().sort( { "order": 1 } );;
       
    }
  },
  Mutation: {
    addRole: async (root, { role }, { models: { Role } }) => {
      try {
        const roleModel = new RoleModel({
          title: role.title,
          order: role.order
        });

        const result = await roleModel.save();

        return { ...result._doc, _id: result.id };
      } catch (err) {
        console.log("error: ", err)
        throw err;
      }
    },
    deleteRole: async (root, args, { models: { Role } }) => {
      return await RoleModel.deleteOne({ _id: mongoose.Types.ObjectId(args.id) }).then(response => {
          return args.id;
      }).catch(error => {
          throw error;
      })
  }
  },
};

export default roleResolvers;
