import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const PORT = process.env.PORT || 5000;

//mongoDB connection
mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("DB connected.");
    })
    .catch((error) => {
        console.error(`DB connection error: ${error}`);
        process.exit(1);
    });

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//handle server error
const unexpectedErrorHandler = (error) => {
    console.error(error);
    if (server) {
        console.log("Server close");
        process.exit(1);
    } else {
        process.exit();
    }
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
