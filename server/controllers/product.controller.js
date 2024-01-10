import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import notificationModel from "../models/notification.model.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

//add a new product
export const addProduct = async (req, res, next) => {
    const newProduct = new productModel(req.body);
    const currentUser = req.currentUser;
    try {
        const ret = await newProduct.save();

        //send notification to admin
        const admins = await userModel.find({ role: "admin" });
        admins.forEach(async (admin) => {
            const notification = new notificationModel({
                title: `New product`,
                message: `New Product added by ${currentUser.name}`,
                user: admin._id,
                onClick: `/admin`,
                read: false,
            });
            await notification.save();
        });
        res.send({
            success: true,
            message: "Product was added successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get all products with filter conditions
export const getAllProducts = async (req, res, next) => {
    const { seller, category = [], age = [], status } = req.body;
    let filters = {};
    if (seller) {
        filters.seller = seller;
    }

    if (status) {
        filters.status = status;
    }
    //filter by category
    if (category.length > 0) {
        filters.category = { $in: category };
    }

    //filter by age
    if (age.length > 0) {
        age.forEach((item) => {
            const fromAge = item.split("-")[0];
            const toAge = item.split("-")[1];
            filters.age = { $gte: fromAge, $lte: toAge };
        });
    }

    try {
        const products = await productModel
            .find(filters)
            .populate("seller")
            .sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Products fetched successfully.",
            data: products,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get products by userId
export const getProductByUserId = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const ret = await productModel
            .find({ seller: userId })
            .populate("seller");
        res.send({
            success: true,
            message: "Products fetched successfully.",
            data: ret,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get a specific product by productId
export const getProductByProductId = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const ret = await productModel
            .findOne({ _id: productId })
            .populate("seller");
        res.send({
            success: true,
            message: "Product fetched successfully.",
            data: ret,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

// edit a specific product by productId
export const updateProductByProductId = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const ret = await productModel.findByIdAndUpdate(productId, req.body);
        res.send({
            success: true,
            message: "Product is updated successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//update status of product by productId
export const changeStatusOfProduct = async (req, res, next) => {
    const { status } = req.body;
    const { productId } = req.params;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, {
            status,
        });

        //send notification to seller
        const notification = new notificationModel({
            title: `Product Status Updated`,
            message: `Your product ${updatedProduct.name} has been ${status}`,
            user: updatedProduct.seller,
            onClick: `/profile`,
            read: false,
        });
        await notification.save();
        res.send({
            success: true,
            message: "Product status is updated successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//upload image for a specific product by productId
export const uploadImage = async (req, res, next) => {
    //upload image to cloudinary
    try {
        const ret = await cloudinary.uploader.upload(req.file.path, {
            folder: "capstoneproject",
        });
        //console.log("ret from cloudinary: ", ret);
        const { productId } = req.params;
        await productModel.findByIdAndUpdate(productId, {
            $push: { images: ret.secure_url },
        });
        res.send({
            success: true,
            message: "Image uploaded successfully.",
            data: ret.secure_url,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//delete product by productId
export const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const ret = await productModel.findByIdAndDelete(productId);
        res.send({
            success: true,
            message: "Product is deleted successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
