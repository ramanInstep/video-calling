import { pubsub } from '../../constants';
// eslint-disable-next-line
import { User } from '../../models';

const POST_ADDED = 'POST_ADDED';

const postResolvers = {
  // Subscription: {
  //   posts: {
  //     subscribe: () => pubsub.asyncIterator([POST_ADDED]),
  //   },
  // },
  Post: {
    user: async ({ user }) => User.findOne({ _id: user }),
  },
  Query: {
    posts: async (root, { cursor, limit = 25 }, { models: { Post } }) => {
      
    },
    getPost: async (root, { id }, { models: { Post } }) => Post.findByPk(id),
  },
  Mutation: {
    addPost: async (root, { title, body, file }, { models: { Post }, authScope }) => {
      if (authScope.user === null) {
        throw new Error('You must be logged in!');
      }

      try {
        const post = await Post.create({
          title, body, file, UserId: authScope.user.id,
        });
        pubsub.publish(POST_ADDED, { posts: { edges: [{ title, body, file }], endCursor: '80' } });
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    updatePost: async (root, { id, title, body }, { models: { Post } }) => Post.update({
      title, body,
    }, {
      returning: true,
      where: {
        id,
      },
    }).then(([rowsUpdate, [updated]]) => (rowsUpdate ? updated.dataValues : {})),
    deletePost: async (root, { id }, { models: { Post } }) => Post.destroy({
      where: {
        id,
      },
    }),
  },
};

export default postResolvers;
