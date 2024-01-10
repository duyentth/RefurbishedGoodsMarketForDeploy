import bidModel from "../models/bid.model.js";

//place a new bid
export const placeNewBid = async (req, res, next) => {
    try {
        const newBid = new bidModel(req.body);
        await newBid.save();
        res.send({
            success: true,
            message: "New Bid was placed successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get all bids
export const getAllBids = async (req, res, next) => {
    try {
        const { product, seller, buyer } = req.body;
        let filters = {};
        if (product) {
            filters.product = product;
        }
        if (seller) {
            filters.seller = seller;
        }
        if (buyer) {
            filters.buyer = buyer;
        }
        const bids = await bidModel
            .find(filters)
            .populate("product")
            .populate("buyer")
            .populate("seller")
            .sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Bids fetched successfully",
            data: bids,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

//get a bid by Id
export const getBidById = async (req, res) => {
    try {
        const ret = await bidModel
            .findOne({ _id: req.params.bidId })
            .populate("product")
            .populate("buyer")
            .populate("seller");
        res.send({
            success: true,
            message: "Bid fetched successfully",
            data: ret,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
