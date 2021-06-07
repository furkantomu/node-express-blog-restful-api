import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils.js";

const authRouter = express.Router();

//REGISTER
authRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPass,
      });

      const user = await newUser.save();

      res.status(200).send({
        _id: user._id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        profilePic: user.profilePic,
        token: generateToken(user),
      });
    } catch (err) {
      res.status(500).send({ message:err.keyPattern.email ? "email is used": "username is used" });
    }
  })
);

//LOGIN

authRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          _id: user._id,
          username: user.username,
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          profilePic: user.profilePic,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid username or password" });
  })
);

export default authRouter;
