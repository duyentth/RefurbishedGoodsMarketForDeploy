import { Modal, Form, Input } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { message } from "antd";
import { placeNewBid } from "../../apicalls/bid";
import { addNotification } from "../../apicalls/noification";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
    const formRef = useRef(null);
    const rules = [{ required: true }];
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const onFinish = async (value) => {
        try {
            dispatch(SetLoader(true));
            const ret = await placeNewBid({
                ...value,
                product: product._id,
                seller: product.seller._id,
                buyer: user._id,
            });
            dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);

                //send notification
                await addNotification({
                    title: "A new bid has been placed.",
                    message: `A new bid has been placed on your product ${product.name} by ${user.name} for $${value.bidAmount}.` ,
                    user: product.seller._id,
                    onClick:"/profile"
                })
                reloadData();
                setShowBidModal(false);
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    return (
        <Modal
            onCancel={() => setShowBidModal(false)}
            open={showBidModal}
            centered
            width={600}
            onOk={() => formRef.current.submit()}
        >
            <div className="flex flex-col gap-5 mb-5">
                <h1 className="text-2xl font-semibold text-orange-900 text-center">
                    New Bid
                </h1>
                <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                    <Form.Item
                        label="Bid Amount"
                        name={"bidAmount"}
                        rules={rules}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Message" name="message" rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mobile" name="mobile" rules={rules}>
                        <Input></Input>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}

export default BidModal;
