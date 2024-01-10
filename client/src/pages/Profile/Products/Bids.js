import React, { useEffect, useState } from "react";
import { Button, Modal, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { getAllBids } from "../../../apicalls/bid";
import moment from "moment";
import Divider from "../../../components/Divider";
import { addNotification } from "../../../apicalls/noification";

function Bids({ showBidsModal, setShowBidModal, selectedProduct }) {
    const dispatch = useDispatch();
    const [bids, setBids] = useState([]);
    const getData = async () => {
        try {
            //dispatch(SetLoader(true));
            const ret = await getAllBids({ product: selectedProduct._id });
            //dispatch(SetLoader(false));
            if (ret.success) {
                setBids(ret.data);
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            //dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const acceptBidHandler = async () => {
        let maxAmountBid = bids[0];
        for (let i = 1; i < bids.length; i++) {
            if (maxAmountBid.bidAmount < bids[i].bidAmount) {
                maxAmountBid = bids[i];
            }
        }
        setShowBidModal(false);
        //send notification
        await addNotification({
            title: "Congratulations!!!",
            message: `Your bid for product ${selectedProduct.name} is accepted. Please click on this message to provide a payment!`,
            user: maxAmountBid.buyer,
            onClick: `/payment/${maxAmountBid._id}`,
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: "Bid Placed On",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(text).format("DD-MM-YYYY hh:mm a");
            },
        },
        {
            title: "Buyer Name",
            dataIndex: "name",
            render: (text, record) => {
                return record.buyer.name;
            },
        },
        {
            title: "Bid Amount",
            dataIndex: "bidAmount",
            render: (text) => {
                return "$" + text;
            },
        },

        {
            title: "Message",
            dataIndex: "message",
        },

        {
            title: "Contact Details",
            dataIndex: "contactDetails",
            render: (text, record) => {
                return (
                    <div>
                        <p>Phone: {record.mobile}</p>
                        <p>Email: {record.buyer.email}</p>
                    </div>
                );
            },
        },
    ];
    return (
        <Modal
            title="Bids"
            open={showBidsModal}
            onCancel={() => {
                setShowBidModal(false);
            }}
            centered
            width={1000}
            footer={null}
        >
            <Divider />
            <div className="flex flex-col gap-3">
                <div className="flex w-full justify-between">
                    <h1>Product Name: {selectedProduct.name}</h1>
                    {bids.length > 0 && (
                        <Button
                            className="bg-primary text-xl rounded"
                            onClick={acceptBidHandler}
                        >
                            Accept Bid
                        </Button>
                    )}
                </div>

                <Table dataSource={bids} columns={columns}></Table>
            </div>
        </Modal>
    );
}

export default Bids;
