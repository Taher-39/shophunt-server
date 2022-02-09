import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controller/orderController.js";
import { protect, isAdmin } from "../middleWare/tokenMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)


export default router;
