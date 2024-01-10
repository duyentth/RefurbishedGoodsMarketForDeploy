import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm.js";
import stripePromise from "../../apicalls/stripeConfig.js";



export default function StripeContainer() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}
