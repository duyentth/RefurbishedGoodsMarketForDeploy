import notificationModel from "../models/notification.model.js";

//add new notification
export const addNotification = async (req, res, next) => {
    try {
        const newNotification = new notificationModel(req.body);
        const ret = await newNotification.save();
        res.send({
            success: true,
            message: "Notification was added successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get notifications by userId
export const getNotificationsByUserId = async (req, res, next) => {
    try {
        const ret = await notificationModel
            .find({ user: req.currentUser.userId })
            .sort({ createdAt: -1 });
        if (!ret) {
            res.send({
                success: false,
                message: "Notification is not found.",
            });
        } else {
            res.send({
                success: true,
                message: "Notifications fetched successfully.",
                data: ret,
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//delete notification by id
export const deleteNotificationById = async (req, res, next) => {
    const { notifId } = req.params;
    try {
        await notificationModel.findByIdAndDelete(notifId);
        res.send({
            success: true,
            message: "Notification was deleted successfully.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//mark all notifications as read by user
export const markAsRead = async (req, res, next) => {
    try {
        await notificationModel.updateMany(
            { user: req.currentUser.userId, read: false },
            { $set: { read: true } }
        );
        res.send({
            success: true,
            message: "All Notification marked as read.",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
