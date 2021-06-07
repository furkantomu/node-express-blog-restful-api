import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/Category.js";



const categoryRouter = express.Router();


categoryRouter.post('/', expressAsyncHandler (async (req,res) =>{
  const newCate = await new Category(req.body);
  try {
    const savedCate = await newCate.save();
    res.status(200).json(savedCate);
  } catch (err) {
    res.status(500).json(err)
  }
}))

categoryRouter.get('/', expressAsyncHandler (async (req,res) =>{
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err)
  }
}))

export default categoryRouter;