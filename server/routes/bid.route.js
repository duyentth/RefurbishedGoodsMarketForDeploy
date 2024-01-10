import express from "express";
import {
    placeNewBid,
    getAllBids,
    getBidById,
} from "../controllers/bid.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

//place a new bid
router.post("/add", checkToken, placeNewBid);

//get all bids with filters(product, seller)
router.post("/", checkToken, getAllBids);

//get bid by Id
router.get("/:bidId", checkToken, getBidById);

export default router;
