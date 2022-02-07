import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getTotalUsers,
  deleteUsers,
  getUserById,
  updateUserByAdmin,
} from "../controller/userController.js";
import { protect, isAdmin } from "../middleWare/tokenMiddleware.js";

router.route("/").post(registerUser).get(protect, isAdmin, getTotalUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUsers)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserByAdmin);

export default router;
