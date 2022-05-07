import {
  addOrderItems,
  deleteAllOrders,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/order.controller";
import express from "express";
import { isAdmin, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(protect, isAdmin, getOrders).post(protect, addOrderItems);

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

router.route("/delete-all-orders").delete(protect, isAdmin, deleteAllOrders);

export default router;
