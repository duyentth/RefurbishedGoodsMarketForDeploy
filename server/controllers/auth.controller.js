import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register for a new user
export const register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //check if user already exists
        const response = await userModel.findOne({ email });
        if (response) {
            throw new Error("This email is already taken.");
        }
        const hashedpsw = await bcrypt.hash(password, 10);
        req.body.password = hashedpsw;
        const newUser = new userModel(req.body);
        const ret = await newUser.save();
        res.send({
            success: true,
            message: "Registered successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//user login
export const login = async (req, res, next) => {
    const { email } = req.body;
    try {
        const ret = await userModel.findOne({ email });
        if (!ret) {
            throw new Error("User not found.");
        }
        if (ret.status !== "active") {
            throw new Error("This user was blocked. Please contact admin!");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            ret.password
        );
        if (!validPassword) {
            throw new Error("Wrong password.");
        }
        //create and assign token
        const token = jwt.sign(
            {
                userId: ret._id,
                name: ret.name,
                email: ret.email,
                role: ret.role,
                status: ret.status,
            },
            process.env.JWT_SECRET_KEY
            // { expiresIn: "1d" }
        );
        res.send({
            success: true,
            message: "Logged in successfully.",
            data: token,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get a specific user by userId
export const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const ret = await userModel.findById(userId);
        res.send({
            success: true,
            message: "User fetched successfully.",
            data: ret,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const ret = await userModel.find();
        res.send({
            success: true,
            message: "Users fetched successfully.",
            data: ret,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//update status of a specific user by userId
export const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const data = req.body;
    try {
        const response = await userModel.findByIdAndUpdate(userId, data);
        //console.log(response);
        res.send({
            success: true,
            message: "User was updated successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get current user
export const getCurrentUser = async (req, res) => {
    try {
        const ret = await userModel.findById(req.currentUser.userId);
        res.send({
            success: true,
            message: "User fetched successfully.",
            data: ret,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
