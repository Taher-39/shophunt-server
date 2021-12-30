import express from "express";
const router = express.Router();
import Products from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//desc   Fetch all products
//routes Get /api/products
//access public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.json(products);
  })
);

//desc   Fetch single products
//routes Get /api/products/:id
//access public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

export default router;
