import React, { Fragment, useEffect, useState } from "react";
import { Table, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice.js";
import { GetAllProducts } from "../../apicalls/product.js";
import { updateSatusOfProduct } from "../../apicalls/product.js";

function Products() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const onStatusUpdate = async (productId, newStatus) => {
        try {
            dispatch(SetLoader(true));
            const ret = await updateSatusOfProduct(productId, newStatus);
            dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);
                getData();
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const ret = await GetAllProducts({});
            dispatch(SetLoader(false));
            if (ret.success) {
                setProducts(ret.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Seller",
            dataIndex: "seller",
            render: (text, record) => {
                return record.seller?.name;
            },
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) =>
                moment(record?.createdAt).format("MM-DD-YYYY hh:mm A"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record;
                return (
                    <div className=" flex gap-5 items-center">
                        {status === "pending" && (
                            <span
                                className="underline cursor-pointer"
                                onClick={() => onStatusUpdate(_id, "approved")}
                            >
                                Approve
                            </span>
                        )}
                        {status === "pending" && (
                            <span
                                className="underline cursor-pointer"
                                onClick={() => onStatusUpdate(_id, "rejected")}
                            >
                                Reject
                            </span>
                        )}
                        {status === "approved" && (
                            <span
                                className="underline cursor-pointer"
                                onClick={() => onStatusUpdate(_id, "blocked")}
                            >
                                Block
                            </span>
                        )}
                        {status === "blocked" && (
                            <span
                                className="underline cursor-pointer"
                                onClick={() => onStatusUpdate(_id, "approved")}
                            >
                                Unblock
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];
    useEffect(() => {
        getData();
    }, []);
    return (
        <Fragment>
            {/* Product table */}
            <Table columns={columns} dataSource={products} />
        </Fragment>
    );
}

export default Products;
