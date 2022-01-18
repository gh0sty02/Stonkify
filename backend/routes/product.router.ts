import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/product.controller";
import express from "express";
import { isAdmin, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);

router.route("/top").get(getTopProducts);

router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .put(protect, isAdmin, updateProduct)
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

export default router;
