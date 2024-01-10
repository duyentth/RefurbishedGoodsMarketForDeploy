import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Button } from "antd";
import { SetLoader } from "../../redux/loaderSlice";
import { getProductByProductId } from "../../apicalls/product";
import moment from "moment";
import Divider from "../../components/Divider";
import BidModal from "./BidModal";
import { getAllBids } from "../../apicalls/bid";

function ProductInfo() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showAddNewBid, setShowAddNewBid] = useState(false);
    const { user } = useSelector((state) => state.user);
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const ret = await getProductByProductId(productId);
            dispatch(SetLoader(false));
            if (ret.success) {
                const bidsOfProduct = await getAllBids({ product: productId });
                setProduct({ ...ret.data, bids: bidsOfProduct.data });
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <Fragment>
            {product && (
                <div>
                    <div className="grid grid-cols-2 gap-5">
                        {/* image */}
                        <div className="flex flex-col gap-2 items-center">
                            <img
                                src={product.images[selectedImageIndex]}
                                alt=""
                                className="w-full h-96 rounded-md object-contain"
                            />
                            <div className="flex gap-5 items-center">
                                {product.images.map((image, index) => {
                                    return (
                                        <img
                                            key={index}
                                            src={image}
                                            alt=""
                                            className={
                                                "w-20 h-20 object-contain cursor-pointer" +
                                                (selectedImageIndex === index
                                                    ? "border-2 border-dashed border-green-500  p-2"
                                                    : "")
                                            }
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                        />
                                    );
                                })}
                            </div>
                            {/* Added On */}
                            <Divider />
                            <div>
                                <h1 className="text-gray-600">Added On</h1>
                                <span className="text-gray-600">
                                    {moment(product.createdAt).format(
                                        "MMM D , YYYY hh:mm A"
                                    )}
                                </span>
                            </div>
                        </div>
                        {/* text Info */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <h1 className="text-2xl font-semibold text-orange-900">
                                    {product.name}
                                </h1>
                                <span>{product.description}</span>
                            </div>

                            <Divider />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-semibold text-orange-900">
                                    Product Details
                                </h1>
                                <div className="flex justify-between mt-2">
                                    <span>Price</span>
                                    <span>$ {product.price}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Category</span>
                                    <span className="uppercase">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Bill Available</span>
                                    <span>
                                        {" "}
                                        {product.billAvailable ? "Yes" : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Box Available</span>
                                    <span>
                                        {product.boxAvailable ? "Yes" : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Accessories Available</span>
                                    <span>
                                        {product.accessoriesAvailable
                                            ? "Yes"
                                            : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Warranty Available</span>
                                    <span>
                                        {product.warrantyAvailable
                                            ? "Yes"
                                            : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Purchased Year</span>
                                    <span>
                                        {moment()
                                            .subtract(product.age, "years")
                                            .format("YYYY")}{" "}
                                        ({product.age} years ago)
                                    </span>
                                </div>
                            </div>

                            <Divider />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-semibold text-orange-900">
                                    Seller Details
                                </h1>
                                <div className="flex justify-between mt-2">
                                    <span>Name</span>
                                    <span> {product.seller.name}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Email</span>
                                    <span>{product.seller.email}</span>
                                </div>
                            </div>

                            <Divider />
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-5">
                                    <h1 className="text-2xl font-semibold text-orange-900">
                                        Bids
                                    </h1>
                                    <Button
                                        onClick={() => {
                                            setShowAddNewBid(true);
                                        }}
                                        disabled={
                                            user._id === product.seller._id
                                        }
                                    >
                                        New Bid
                                    </Button>
                                </div>

                                {showAddNewBid && (
                                    <BidModal
                                        product={product}
                                        showBidModal={true}
                                        setShowBidModal={setShowAddNewBid}
                                        reloadData={getData}
                                    />
                                )}
                                {product.showBidsOnProductPage &&
                                    product.bids.map((bid, index) => {
                                        return (
                                            <div
                                                className="border border-gray-300 border-solid p-3 rounded mt-5"
                                                key={index}
                                            >
                                                <div className="flex justify-between text-gray-700">
                                                    <span>Name</span>
                                                    <span>
                                                        {" "}
                                                        {bid.buyer.name}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Bid Amount</span>
                                                    <span>
                                                        {" "}
                                                        $ {bid.bidAmount}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Bid Place On</span>
                                                    <span>
                                                        {" "}
                                                        {moment(
                                                            bid.createdAt
                                                        ).format(
                                                            "MMM D , YYYY hh:mm A"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ProductInfo;
