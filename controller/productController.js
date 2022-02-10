import Products from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//desc   Fetch all products
//routes Get /api/products
//access public
const getProducts = asyncHandler(async (req, res) => {
  const productInSinglePage = 2;//pageSize
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Products.count({ ...keyword });
  const products = await Products.find({ ...keyword })
    .limit(productInSinglePage)
    .skip(productInSinglePage * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / productInSinglePage) });
});

//desc   Fetch single products
//routes Get /api/products/:id
//access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//desc   DELETE single products
//routes DELETE /api/products/:id
//access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product remove" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//desc   Create a single product
//routes POST /api/products
//access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Products({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//desc   Update a single product
//routes PUT /api/products/:id
//access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const createdProduct = await product.save();
    res.json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//desc   Create a new review
//routes POST /api/products/:id/reviews
//access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  createProductReview,
  updateProduct,
};
