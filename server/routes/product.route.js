import {
    addProduct,
    getAllProducts,
    getProductByUserId,
    getProductByProductId,
    updateProductByProductId,
    changeStatusOfProduct,
    deleteProduct,
    uploadImage,
} from "../controllers/product.controller.js";

import express from "express";
import { checkToken } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//add a new product
router.post("/add", checkToken, addProduct);

//get all products
router.post("/", checkToken, getAllProducts);

//get products by userId
//router.get("/:userId", checkToken, getProductByUserId);

//get a specific product by productId
router.get("/:productId", checkToken, getProductByProductId);

// edit a specific product by productId
router.put("/:productId", checkToken, updateProductByProductId);

//update status of product by productId
router.patch("/:productId", checkToken, changeStatusOfProduct);

//upload image for a specific product by productId
router.put(
    "/:productId/images/add",
    checkToken,
    multer({ storage }).single("file"),
    uploadImage
);

//delete product by productId
router.delete("/:productId", checkToken, deleteProduct);

export default router;
