import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  registerUser,
  tokenLogin,
  updateUser,
  updateUserProfile,
} from "../controllers/user.controller";
import express from "express";
import { isAdmin, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/tokenlogin", tokenLogin);
router
  .use(protect, isAdmin)
  .route("/:id")
  .delete(deleteUser)
  .put(updateUser)
  .get(getUser);

export default router;
