import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        amount: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            default: "USD",
        },
        shippingInfo: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);
const paymentModel = mongoose.model("payments", paymentSchema);
export default paymentModel;
