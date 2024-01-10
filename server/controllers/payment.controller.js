import paymentModel from "../models/payment.model.js";
import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

//make a payment
export const makePayment = async (req, res, next) => {
    const {
        product,
        seller,
        buyer,
        amount,
        tax,
        total,
        method,
        currency,
        billing_details,
    } = req.body;
    try {
        const stripAmount = total * 100;
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: stripAmount,
            currency,
            payment_method: method,
            payment_method_types: ["card"],
            confirm: true,
        });
        //add a payment to database
        const newPayment = new paymentModel({
            product,
            seller,
            buyer,
            amount,
            tax,
            total,
            method,
            currency,
            shippingInfo: billing_details,
        });
        await newPayment.save();
        res.send({
            success: true,
            message: "Paid successfully",
            data: paymentIntent,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
