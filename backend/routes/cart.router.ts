import {
  addItemToCart,
  cartInitAfterLogin,
  changeQty,
  emptyCart,
  getAllCartItems,
  removeItemFromCart,
} from "../controllers/cart.controller";
import express from "express";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(protect, getAllCartItems)
  .post(protect, addItemToCart)
  .delete(protect, emptyCart);
router
  .route("/:id")
  .put(protect, changeQty)
  .delete(protect, removeItemFromCart);

router.route("/init").post(protect, cartInitAfterLogin);

export default router;
