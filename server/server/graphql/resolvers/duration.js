const DurationModel = require('../../models/duration');

const durationResolvers = {
    Query: {
        durations: async (root, args, { models: { Duration } }) => {
            return await DurationModel.find({});
        },
        duration: async (root, { id }, { models: { Duration } }) => {
            Duration.findByPk(id)
        },
    },
    Mutation: {
        addDuration: async (root, { name }, { models: { Duration } }) => {
            try {
                const existingDuration = await DurationModel.findOne({ name: name });
                if (existingDuration) {
                    throw new Error('Duration exists already.');
                }

                const duration = new DurationModel({
                    name: name
                });

                const result = await duration.save();

                return { ...result._doc, _id: result.id };
            } catch (err) {
                console.log("error: ", err)
                throw err;
            }
        },
    },
};

export default durationResolvers;
