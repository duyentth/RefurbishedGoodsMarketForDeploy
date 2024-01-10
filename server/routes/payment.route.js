import express from "express";
import { checkToken } from "../middlewares/auth.middleware.js";
import { makePayment } from "../controllers/payment.controller.js";

const router = express.Router();

//place a new bid
router.post("/", checkToken, makePayment);

export default router;
