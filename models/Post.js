import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: false },
    username: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
