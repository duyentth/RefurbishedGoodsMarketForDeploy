import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import {
    addNewProduct,
    updateProductByProductId,
} from "../../../apicalls/product";
import Images from "./Images";

function ProductForm({
    showProductForm,
    setShowProductForm,
    selectedProduct,
    getData,
}) {
    const additionalInfo = [
        { lable: "Bill Available", name: "billAvailable" },
        { lable: "Warranty Available", name: "warrantyAvailable" },
        { lable: "Accessories Available", name: "accessoriesAvailable" },
        { lable: "Box Available", name: "boxAvailable" },
    ];
    const rules = [{ required: true }];
    const formRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState("1");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const onFinish = async (value) => {
        try {
            dispatch(SetLoader(true));
            let ret = null;
            if (!selectedProduct) {
                //add new product
                value.seller = user._id;
                ret = await addNewProduct(value);
            } else {
                //update existing product
                ret = await updateProductByProductId(
                    selectedProduct._id,
                    value
                );
            }
            dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);
                getData();
                setShowProductForm(false);
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct);
        }
    }, [selectedProduct]);
    return (
        <Modal
            title=""
            open={showProductForm}
            onCancel={() => setShowProductForm(false)}
            centered
            width={1000}
            okText="Save"
            onOk={() => formRef.current.submit()}
            {...(selectedTab === "2" && { footer: false })}
        >
            <div>
                <h1 className="text-primary text-2xl text-center font-semibold uppercase">
                    {selectedProduct ? "Edit Product" : "Add Product"}
                </h1>
                <Tabs
                    defaultActiveKey="1"
                    activeKey={selectedTab}
                    onChange={(key) => setSelectedTab(key)}
                >
                    <Tabs.TabPane tab="General" key={1}>
                        <Form
                            layout="vertical"
                            ref={formRef}
                            onFinish={onFinish}
                        >
                            <Form.Item label="Name" name="name" rules={rules}>
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={rules}
                            >
                                <TextArea />
                            </Form.Item>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Price"
                                        name="price"
                                        rules={rules}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Category"
                                        name={"category"}
                                        rules={rules}
                                    >
                                        <select>
                                            <option value={""}>Select</option>
                                            <option value="electronics">
                                                Electronics
                                            </option>
                                            <option value="fashion">
                                                Fashion
                                            </option>
                                            <option value="home">Home</option>
                                            <option value="sports">
                                                Sports
                                            </option>
                                        </select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Age"
                                        name="age"
                                        rules={rules}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="flex gap-10 p-5">
                                {additionalInfo.map((item, index) => {
                                    return (
                                        <Form.Item
                                            key={index}
                                            label={item.lable}
                                            name={item.name}
                                            valuePropName="checked"
                                        >
                                            <Input
                                                type="checkbox"
                                                value={item.name}
                                                onChange={(e) => {
                                                    formRef.current.setFieldsValue(
                                                        {
                                                            [item.name]:
                                                                e.target
                                                                    .checked,
                                                        }
                                                    );
                                                }}
                                                checked={formRef.current?.getFieldValue(
                                                    item.name
                                                )}
                                            />
                                        </Form.Item>
                                    );
                                })}

                                {/* show bid on product page checkbox */}
                                <Form.Item
                                    label="Show Bids on Product Page"
                                    name="showBidsOnProductPage"
                                    valuePropName="checked"
                                >
                                    <Input
                                        type="checkbox"
                                        onChange={(e) => {
                                            formRef.current.setFieldsValue({
                                                showBidsOnProductPage:
                                                    e.target.checked,
                                            });
                                        }}
                                        checked={formRef.current?.getFieldValue(
                                            "showBidsOnProductPage"
                                        )}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </Tabs.TabPane>

                    <Tabs.TabPane
                        tab="Images"
                        key={2}
                        disabled={!selectedProduct}
                    >
                        <Images
                            selectedProduct={selectedProduct}
                            getData={getData}
                            setShowProductForm={setShowProductForm}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Modal>
    );
}

export default ProductForm;
