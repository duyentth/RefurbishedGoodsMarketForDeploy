import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import { message } from "antd";
import { makePayment } from "../../apicalls/payment";
import { useParams } from "react-router-dom";
import { getBidById } from "../../apicalls/bid";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../apicalls/noification";
import { updateSatusOfProduct } from "../../apicalls/product";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#252424",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee",
        },
    },
};

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    //const [address, setAddress] = useState("");
    const [bid, setBid] = useState(null);
    const { bidId } = useParams();

    const getBidInfo = async () => {
        try {
            const ret = await getBidById(bidId);
            setBid({ ...ret.data });
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getBidInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addressElement = elements.getElement(AddressElement);
        let addressElementValues = await addressElement.getValue();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: addressElementValues.value,
        });

        const amount = bid.bidAmount;
        const tax = Math.round(amount * 0.07);
        const total = amount + tax;
        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await makePayment({
                    product: bid.product,
                    seller: bid.seller,
                    buyer: bid.buyer,
                    amount,
                    tax,
                    total,
                    method: id,
                    currency: "USD",
                    billing_details: paymentMethod.billing_details,
                });
                if (response.success) {
                    message.success(
                        "You just bought a great one. Congrats this is the best decision of you're life. Thank you!!"
                    );

                    //send notification to seller
                    await addNotification({
                        title: "A payment has been sent to you.",
                        message: `${bid.buyer.name} just paid $${amount} for your product ${bid.product.name}`,
                        user: bid.seller._id,
                        onClick: "/profile",
                    });

                    //change status of product to block
                    await updateSatusOfProduct(bid.product._id, "blocked");
                    navigate("/");
                }
            } catch (error) {
                message.error(error.message);
            }
        } else {
            message.error(error.message);
        }
    };

    return (
        <>
            {bid && (
                <div className=" flex  flex-col justify-center items-center">
                    <div className="bg-white rounded w-[600px] p-10 border border-solid border-primary">
                        <div className="flex flex-col gap-5">
                            {/* Payment Info */}
                            <div>
                                <h1 className="text-2xl">
                                    Payment Information
                                </h1>
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="float">
                                        <p className="float-left">
                                            Product Name:{" "}
                                        </p>
                                        <span className="float-right">
                                            {bid.product.name}
                                        </span>
                                    </div>
                                    <div className="float">
                                        <p className=" float-left">
                                            Bid Amount:{" "}
                                        </p>
                                        <span className="float-right">
                                            ${bid.bidAmount}
                                        </span>
                                    </div>
                                    <div className="float">
                                        <p className=" float-left">Tax: </p>
                                        <span className=" float-right">
                                            ${Math.round(bid.bidAmount * 0.07)}
                                        </span>
                                    </div>
                                    <div className="float">
                                        <p className=" float-left">Total:{}</p>
                                        <span className="text-xl float-right">
                                            $
                                            {bid.bidAmount +
                                                Math.round(
                                                    bid.bidAmount * 0.07
                                                )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Shipping/Billing Address */}
                            <div>
                                <AddressElement
                                    options={{ mode: "shipping" }}
                                />
                            </div>
                            {/* Card Info */}
                            <div>
                                <form
                                    className="flex flex-col gap-5"
                                    onSubmit={handleSubmit}
                                >
                                    <fieldset className="FormGroup">
                                        <div className="FormRow flex flex-col gap-5">
                                            {/* <div>
                                                <h3 className="text-2xl">
                                                    Shipping
                                                </h3>
                                            </div>
                                            <div>
                                                <AddressElement
                                                    options={{
                                                        mode: "shipping",
                                                    }}
                                                    onChange={(event) => {
                                                        if (event.complete) {
                                                            // Extract potentially complete address
                                                            setAddress(
                                                                event.value
                                                                    .address
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div> */}
                                            <div>
                                                <h1>Card info</h1>
                                            </div>
                                            <div>
                                                <CardElement
                                                    options={CARD_OPTIONS}
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="items-end">
                                        <button className="w-full bg-primary text-2xl uppercase rounded">
                                            Pay
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
