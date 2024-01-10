import express from "express";
import { checkToken } from "../middlewares/auth.middleware.js";

import {
    updateUser,
    getAllUsers,
    getUserById,
    login,
    register,
    getCurrentUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

//register a new user
router.post("/register", register);

//user login
router.post("/login", login);

//get a specific user by userId
router.get("/users/:userId", checkToken, getUserById);

//get all users
router.get("/users", checkToken, getAllUsers);

//update user by userId
router.put("/users/:userId", checkToken, updateUser);

//get current user
router.get("/users/user/current-user", checkToken, getCurrentUser);

export default router;
