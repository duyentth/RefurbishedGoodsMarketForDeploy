import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { getAllBids } from "../../../apicalls/bid";

function BidsTab() {
    const dispatch = useDispatch();
    const [bids, setBids] = useState([]);
    const { user } = useSelector((state) => state.user);
    const columns = [
        {
            title: "Product Name",
            dataIndex: "productname",
            render: (text, record) => {
                return record.product.name;
            },
        },
        {
            title: "Bid Placed On",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(text).format("DD-MM-YYYY hh:mm a");
            },
        },
        {
            title: "Seller",
            dataIndex: "name",
            render: (text, record) => {
                return record.seller.name;
            },
        },
        {
            title: "Offered Price",
            dataIndex: "offeredPrice",
            render: (text, record) => {
                return "$" + record.product.price;
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
                        <p>Email: {record.seller.email}</p>
                    </div>
                );
            },
        },
    ];

    const getData = async () => {
        try {
            //dispatch(SetLoader(true));
            const ret = await getAllBids({ buyer: user._id });
            //dispatch(SetLoader(false));
            if (ret.success) {
                setBids(ret.data);
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            // dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <Table dataSource={bids} columns={columns}></Table>
        // <Modal
        //     title="Bids"
        //     // open={showBidsModal}
        //     // onCancel={() => {
        //     //     setShowBidModal(false);
        //     // }}
        //     centered
        //     width={1000}
        //     footer={null}
        // >
        //     <Table dataSource={bids} columns={columns}></Table>
        // </Modal>
    );
}

export default BidsTab;
