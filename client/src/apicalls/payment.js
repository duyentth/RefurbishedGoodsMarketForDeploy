import { axiosInstance } from "./axiosInstance";

//make a payment
export const makePayment = async (data) => {
    try {
        const ret = await axiosInstance.post("/api/payments", data);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};
