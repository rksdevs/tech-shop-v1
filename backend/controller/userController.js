import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   public
const authUser = asyncHandler(async(req, res)=>{
    res.send("auth user");
})

// @desc     Register user 
// @route    POST /api/users
// @access   public
const registerUser = asyncHandler(async(req, res)=>{
    res.send("Register user");
})

// @desc     Logout and delete token
// @route    POST /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async(req, res)=>{
    res.send("Logout");
})

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   public
const getUserProfile = asyncHandler(async(req, res)=>{
    res.send("Get user profile");
})

// @desc     update user
// @route    PUT /api/users/profile
// @access   private
const updateUserProfile = asyncHandler(async(req, res)=>{
    res.send("Update user");
})

// @desc     Get All users
// @route    GET /api/users
// @access   private/admin
const getUsers = asyncHandler(async(req, res)=>{
    res.send("Get users");
})

// @desc     Get user By Id
// @route    GET /api/users/:id
// @access   private/admin
const getUserByID = asyncHandler(async(req, res)=>{
    res.send("Get user by ID");
})

// @desc     Delete users
// @route    DELETE /api/users/:id
// @access   private/admin
const deleteUser = asyncHandler(async(req, res)=>{
    res.send("Delete users");
})

// @desc     Update user
// @route    PUT /api/users/:id
// @access   private/admin
const updateUser = asyncHandler(async(req, res)=>{
    res.send("Update user");
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserByID,
    getUsers,
    updateUser,
    deleteUser,  
};