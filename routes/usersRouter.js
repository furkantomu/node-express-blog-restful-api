import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

const usersRouter = express.Router();

//UPDATE
usersRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (req.body.id === req.body.token) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).send({ message:err.keyPattern.email ? "email is used": "username is used" });
      }
    } else {
      res.status(401).json("You can update only your account");
    }
  })
);

//DELETE

usersRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (req.body.id === req.body.token) {
      try {
        const user = await User.findById(req.params.id);
        try {
          // await Post.deteleMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found");
      }
    } else {
      res.status(401).json("You can delete only your account");
    }
  })
);

//GET USER

usersRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);
export default usersRouter;
