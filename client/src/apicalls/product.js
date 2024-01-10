import { axiosInstance } from "./axiosInstance";

//add a new product
export const addNewProduct = async (payload) => {
    try {
        const ret = await axiosInstance.post("/api/products/add", payload);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//get all products with filters
export const GetAllProducts = async (filters) => {
    try {
        const ret = await axiosInstance.post("/api/products", filters);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//update an existing product by productId
export const updateProductByProductId = async (productId, value) => {
    try {
        const ret = await axiosInstance.put(
            `/api/products/${productId}`,
            value
        );
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//upload images-formDat contains file
export const uploadImages = async (productId, formData) => {
    try {
        const ret = await axiosInstance.put(
            `/api/products/${productId}/images/add`,
            formData
        );
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//update status of product by productId
export const updateSatusOfProduct = async (productId, newStatus) => {
    try {
        const ret = await axiosInstance.patch(`/api/products/${productId}`, {
            status: newStatus,
        });
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//get product by productId
export const getProductByProductId = async (productId) => {
    try {
        const ret = await axiosInstance.get(`/api/products/${productId}`);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//delete Product by productId
export const deleteProduct = async (productId) => {
    try {
        const ret = await axiosInstance.delete(`/api/products/${productId}`);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};
