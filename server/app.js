import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import notificationRouter from "./routes/notification.route.js";
import productRouter from "./routes/product.route.js";
import bidRouter from "./routes/bid.route.js";
import paymentRouter from "./routes/payment.route.js";
import * as path from "path";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/products", productRouter);
app.use("/api/bids", bidRouter);
app.use("/api/payments", paymentRouter);

//error handler
app.use((error, req, res, next) => {
    if (error) {
        console.log("error is: ", error);
        res.status(500).send("Server Error: ", error);
    } else {
        next();
    }
});

app.use((req, res) => {
    console.log("url is: ", req.url);
    res.status(501).send("API is not supported.");
});

// deployment config
//import * as path from "path";
// __dirname = path.resolve();
import { fileURLToPath } from "url";
//import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

export default app;
