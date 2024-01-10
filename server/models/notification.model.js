import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        onClick: {
            //a place(profile or home) where user will be navigate to as clicking on the notification
            type: String,
            required: true,
        },
        user: {
            //receiver(seller, buyer, admin)
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const notificationModel = mongoose.model("notifications", notificationSchema);

export default notificationModel;
