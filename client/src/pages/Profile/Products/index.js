import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import ProductForm from "./ProductForm.js";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice.js";
import { GetAllProducts, deleteProduct } from "../../../apicalls/product.js";
import Bids from "./Bids.js";

function Products() {
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showBidModal, setShowBidModal] = useState(false);
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const ret = await GetAllProducts({ seller: user._id });
            dispatch(SetLoader(false));
            if (ret.success) {
                setProducts(ret.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const onDelete = async (productId) => {
        try {
            // dispatch(SetLoader(true));
            const ret = await deleteProduct(productId);
            //dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);
                getData();
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            // dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
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
                moment(record.createdAt).format("MM-DD-YYYY hh:mm A"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className=" flex gap-5 items-center">
                        <i
                            className="ri-delete-bin-line"
                            onClick={() => onDelete(record._id)}
                        ></i>
                        <i
                            className="ri-pencil-line"
                            onClick={() => {
                                setSelectedProduct(record);
                                setShowProductForm(true);
                            }}
                        ></i>

                        <span
                            className="underline cursor-pointer"
                            onClick={() => {
                                setSelectedProduct(record);
                                setShowBidModal(true);
                            }}
                        >
                            Show Bids
                        </span>
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
            <div className="flex justify-end items-center p-5">
                <Button
                    type="default"
                    onClick={() => {
                        setShowProductForm(true);
                        setSelectedProduct(null);
                    }}
                >
                    Add Product
                </Button>
                {showProductForm && (
                    <ProductForm
                        showProductForm={showProductForm}
                        setShowProductForm={setShowProductForm}
                        selectedProduct={selectedProduct}
                        getData={getData}
                    />
                )}
            </div>
            {/* Product table */}
            <Table columns={columns} dataSource={products} />
            {showBidModal && (
                <Bids
                    showBidsModal={showBidModal}
                    setShowBidModal={setShowBidModal}
                    selectedProduct={selectedProduct}
                />
            )}
        </Fragment>
    );
}

export default Products;
