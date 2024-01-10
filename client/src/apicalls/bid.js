import { axiosInstance } from "./axiosInstance";

//place a new bid
export const placeNewBid = async (data) => {
    try {
        const ret = await axiosInstance.post("/api/bids/add", data);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

////get all bids with filters (product and seller)
export const getAllBids = async (filters) => {
    try {
        const ret = await axiosInstance.post("/api/bids", filters);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//get bid by Id
export const getBidById = async (bidId) => {
    try {
        const ret = await axiosInstance.get(`/api/bids/${bidId}`);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};
