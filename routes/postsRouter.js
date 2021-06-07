import express from "express";
import expressAsyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const postRouter = express.Router();

//CREATE POST
postRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newPost = await new Post(req.body);
    
    try {
      newPost.save();
      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//UPDATE POST

postRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })
);
//DELETE POST

postRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.token === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//GET SINGLE POST

postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//GET ALL POSTS
postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const username = req.query.user;
    const catName = req.query.category;

    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

export default postRouter;
