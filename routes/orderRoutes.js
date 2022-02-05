import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controller/orderController.js";
import { protect } from "../middleWare/tokenMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);

export default router;
