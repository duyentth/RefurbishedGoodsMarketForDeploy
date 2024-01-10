import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        status: {
            type: String,
            default: "active",
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
