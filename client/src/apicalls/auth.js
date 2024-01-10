import { axiosInstance } from "./axiosInstance.js";

//user register
export const userRegister = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/auth/register",
            payload
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};

//user login
export const userLogin = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

//get current user
export const getCurrentUser = async () => {
    try {
        const ret = await axiosInstance.get(
            `/api/auth/users/user/current-user`
        );
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//get all user
export const getAllUsers = async () => {
    try {
        const ret = await axiosInstance.get(`/api/auth/users`);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//update user by userId
export const updateUser = async (userId, data) => {
    try {
        const ret = await axiosInstance.put(`/api/auth/users/${userId}`, data);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};
