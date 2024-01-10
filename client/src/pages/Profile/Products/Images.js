import { Button, message } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import {
    updateProductByProductId,
    uploadImages,
} from "../../../apicalls/product";

function Images({ selectedProduct, setShowProductForm, getData }) {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState(selectedProduct.images);
    const [showPreview, setShowPreview] = useState(true);
    const dispatch = useDispatch();

    const deleteImage = async (image) => {
        try {
            const updatedImageArray = images.filter((img) => img !== image);
            const updatedProduct = {
                ...selectedProduct,
                images: updatedImageArray,
            };
            const ret = await updateProductByProductId(
                selectedProduct._id,
                updatedProduct
            );
            if (ret.success) {
                message.success(ret.message);
                setImages(updatedImageArray);
                getData();
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    const upload = async () => {
        console.log("file: ", file);
        try {
            //dispatch(SetLoader(true));
            //upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            const ret = await uploadImages(selectedProduct._id, formData);
            //dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);
                setImages([...images, ret.data]);
                setShowPreview(false);
                setFile(null);
                getData();
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            //dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    return (
        <Fragment>
            <div className="flex gap-5 mb-5">
                {images.map((image, index) => {
                    return (
                        <div
                            key={index}
                            className="flex gap-2 border border-solid border-gray-500 rounded p-5 items-end "
                        >
                            <img
                                className="h-20 w-20 object-cover"
                                src={image}
                                alt=""
                            />
                            <i
                                className="ri-delete-bin-line"
                                onClick={() => deleteImage(image)}
                            ></i>
                        </div>
                    );
                })}
            </div>
            <Upload
                listType="picture"
                beforeUpload={() => false}
                onChange={(info) => {
                    setFile(info.file);
                    setShowPreview(true);
                }}
                showUploadList={showPreview}
            >
                <Button type="dashed">Upload Image</Button>
            </Upload>
            <div className="flex justify-end gap-5 mt-5">
                <Button
                    type="default"
                    onClick={() => {
                        setShowProductForm(false);
                    }}
                >
                    Cancel
                </Button>
                <Button type="primary" disabled={!file} onClick={upload}>
                    Upload
                </Button>
            </div>
        </Fragment>
    );
}

export default Images;
