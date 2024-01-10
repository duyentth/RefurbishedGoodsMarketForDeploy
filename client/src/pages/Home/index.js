import React, { Fragment, useEffect, useState } from "react";
import { message } from "antd";
import { GetAllProducts } from "../../apicalls/product";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider.js";
import Filters from "./Filters";

function Home() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        status: "approved",
        category: [],
        age: [],
    });
    const [showFilters, setShowFilters] = useState(true);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSearch = (e) => {
        setSearchText(e.target.value.toLocaleLowerCase());
    };
    const getData = async () => {
        try {
            // dispatch(SetLoader(true));
            const ret = await GetAllProducts(filters);
            dispatch(SetLoader(false));
            if (ret.success) {
                const temp = ret.data;
                setProducts(
                    temp.filter((product) =>
                        product.name.toLocaleLowerCase().includes(searchText)
                    )
                );
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
    }, [filters, searchText]);
    return (
        <Fragment>
            <div className="flex gap-5">
                {/* Filters */}
                {showFilters && (
                    <Filters
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        filters={filters}
                        setFilters={setFilters}
                        getData={getData}
                    />
                )}
                {/* ProductsList and FilterIcon and SearchBar */}
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex gap-5 items-center">
                        <i
                            className="ri-equalizer-line"
                            onClick={() => setShowFilters(!showFilters)}
                        ></i>

                        <input
                            type="text"
                            placeholder="Search Products here..."
                            className="border border-gray-300 rounded border-solid w-full p-2 h-14"
                            onChange={(e) => {
                                onSearch(e);
                            }}
                        />
                    </div>

                    <div className=" grid grid-cols-4 gap-2">
                        {products.map((product) => {
                            return (
                                <div
                                    className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                                    key={product._id}
                                    onClick={() =>
                                        navigate(`/products/${product._id}`)
                                    }
                                >
                                    <img
                                        src={product.images[0]}
                                        className="w-full h-40 rounded-md p-2 object-contain"
                                        alt=""
                                    />
                                    <div className="px-2 flex flex-col">
                                        <h1 className="text-lg font-semibold">
                                            {product.name}
                                        </h1>
                                        <p className="text-sm">
                                            {product.age}{" "}
                                            {product.age === 1
                                                ? " year"
                                                : " years"}{" "}
                                            old
                                        </p>
                                        <Divider />
                                        <span className="text-xl font-semibold text-green-700">
                                            $ {product.price}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
