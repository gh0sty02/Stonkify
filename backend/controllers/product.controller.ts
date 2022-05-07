import { Request, Response, NextFunction } from "express";
import Review from "../models/review.model";
import mongoose from "mongoose";
import Product from "../models/product.model";

// @desc    get all products
// @route   GET /api/products/
// @access  public
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    next(err);
  }
};

// @desc    get a product by product id
// @route   GET /api/products//:id
// @access  public
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// @desc    delete a product by product id
// @route   DELETE /api/products/:id
// @access  public/admin
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.remove();
    return res.status(200).json({ message: "Product Deleted" });
  } catch (err) {
    next(err);
  }
};

// @desc    create a new sample product
// @route   POST /api/products/
// @access  public/admin
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // creating a default product, which can be edited on the frontend
    const newProduct = new Product({
      name: "Sample Name",
      user: req.user?._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      description: "Sample Description",
      reviews: [],
      price: 0,
      countInStock: 0,
    });

    const createdProduct = await newProduct.save();

    if (!createdProduct) {
      res.status(500);
      throw new Error("Something went wrong");
    }

    return res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

// @desc    update a  product
// @route   PUT /api/products/:id
// @access  public/admin
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, image, brand, category, description, price, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    // updating the product, if found
    if (product) {
      product.name = name;
      product.user = new mongoose.Types.ObjectId(req.user?._id);
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;
    }

    // creating a new product, if existing product not found
    const createdProduct = await product?.save();

    if (!createdProduct) {
      res.status(500);
      throw new Error("Something went wrong");
    }

    return res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

// @desc    create a new review
// @route   POST /api/products/:id/reviews
// @access  private
export const createProductReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await mongoose.startSession({
      defaultTransactionOptions: {
        writeConcern: { w: "majority" },
        readConcern: { level: "majority" },
      },
    });
    session.startTransaction();
    try {
      const { rating, comment }: { rating: string; comment: string } = req.body;

      const product = await Product.findById(req.params.id).session(session);
      const curProduct = await Product.find({ _id: req.params.id }).session(
        session
      );

      if (product) {
        // check if the user has already reviewed the product
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user?._id.toString()
        );

        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Product already reviewed");
        }
      }

      if (req.user && product) {
        // create a new reviewq
        const review = {
          name: req.user.name,
          rating: parseInt(rating),
          comment,
          user: new mongoose.Types.ObjectId(req.user._id),
          product: new mongoose.Types.ObjectId(product._id),
        };

        const createdReview = new Review(review, { session });
        await createdReview.save({ session });

        // pushing the new review to the product's reviews
        product.reviews.push(createdReview);
        product.numReviews = product.reviews.length;

        // calculating the average rating using total reviews and total ratings
        product.rating =
          product?.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product?.reviews.length;

        await product.save({ session });
        session.commitTransaction();

        return res
          .status(201)
          .json({ message: "Review Added", review: createdReview });
      } else {
        throw new Error("Something went wrong, check if logged in");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    get top rated products
// @route   GET /api/products/top
// @access  public
export const getTopProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(3);

    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
