const { update } = require("./models/Post.model");
const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getAllPosts: async () => {
      return (posts = await Post.find());
    },
    getPost: async (_parent, { id }, _context, _info) => {
        return await Post.findById(id); 
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
        const { id } = args;
        await Post.findByIdAndDelete(id);
        return `Alright, the post with the ID: ${id} is deleted.`
    },
    updatePost: async (parent, args, context, info) => {
        const { id } = args
        const { title, description } = args.post;
        const updates = {}
        if (title !== undefined) {
            updates.title = title;
        };
        if (description !== undefined) {
            updates.description = description;
        };
        const newpost = await Post.findByIdAndUpdate(id, updates, {new: true})
        return newpost;
      },
  },
};

module.exports = resolvers;
