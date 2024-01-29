import express from "express";
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUserByID, getUsers, updateUser, deleteUser,  } from "../controller/userController.js";

//get all users - admin
router.get("/", getUsers);

//login or auth
router.post("/login", authUser);

//register user
router.post("/", registerUser);

//logout user
router.post("/logout", logoutUser);

//get user profile - by user
router.get("/profile", getUserProfile)

//update user profile by user - private
router.put("/profile", updateUserProfile);

//get user by id - admin
router.get("/:id", getUserByID);

//delete user -- admin
router.delete("/:id", deleteUser);

//update user -- admin
router.put("/:id", updateUser);

export default router;