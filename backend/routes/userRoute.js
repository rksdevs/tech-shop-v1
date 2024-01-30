import express from "express";
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUserByID, getUsers, updateUser, deleteUser,  } from "../controller/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

//get all users - admin
router.get("/", protect, admin, getUsers);

//login or auth
router.post("/auth", authUser);

//register user
router.post("/", registerUser);

//logout user
router.post("/logout", logoutUser);

//get user profile - by user
router.get("/profile", protect, getUserProfile)

//update user profile by user - private
router.put("/profile", protect, updateUserProfile);

//get user by id - admin
router.get("/:id", protect, admin, getUserByID);

//delete user -- admin
router.delete("/:id", protect, admin, deleteUser);

//update user -- admin
router.put("/:id", protect, admin, updateUser);

export default router;