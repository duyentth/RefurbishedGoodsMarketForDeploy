import {
    addNotification,
    getNotificationsByUserId,
    deleteNotificationById,
    markAsRead,
} from "../controllers/notification.controller.js";

import { checkToken } from "../middlewares/auth.middleware.js";

import express from "express";
const router = express.Router();

//add new notification
router.post("/add", checkToken, addNotification);

//get notifications by userId
router.get("/", checkToken, getNotificationsByUserId);

//delete notification by id
router.delete("/:notifId", checkToken, deleteNotificationById);

//mark all notifications as read
router.patch("/", checkToken, markAsRead);

export default router;
