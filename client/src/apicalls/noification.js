import { axiosInstance } from "./axiosInstance";

//add new notification
export const addNotification = async (data) => {
    try {
        const ret = await axiosInstance.post("/api/notifications/add", data);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//get notifications by userId
export const getNotifications = async () => {
    // console.log("userId: ", userId);
    try {
        const ret = await axiosInstance.get(`/api/notifications`);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//delete notification by id
export const deleteNotificationById = async (notificationId) => {
    try {
        const ret = await axiosInstance.delete(
            `/api/notifications/${notificationId}`
        );
        return ret.data;
    } catch (error) {
        return error.message;
    }
};

//mark all notifications as read
export const markAsRead = async () => {
    try {
        const ret = await axiosInstance.patch(`/api/notifications`);
        return ret.data;
    } catch (error) {
        return error.message;
    }
};
