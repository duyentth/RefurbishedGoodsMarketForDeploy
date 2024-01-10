import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider.js";
import { userRegister } from "../../apicalls/auth.js";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice.js";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rules = [
        {
            required: true,
            message: "required",
        },
    ];
    const onFinish = async (value) => {
        dispatch(SetLoader(true));
        try {
            const ret = await userRegister(value);
            dispatch(SetLoader(false));
            message.success(ret.message);
            navigate("/login");
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);
    return (
        <div className="h-screen bg-primary flex justify-center items-center">
            <div className="bg-white rounded w-[450px] p-5">
                <h1 className="text-primary text-2xl text-center">REGISTER</h1>
                <Divider />
                <Form layout="vertical" onFinish={onFinish}>
                    <FormItem label="Name" name="name" rules={rules}>
                        <Input placeholder="Name" />
                    </FormItem>
                    <FormItem label="Email" name="email" rules={rules}>
                        <Input placeholder="Email" />
                    </FormItem>
                    <FormItem label="Password" name="password" rules={rules}>
                        <Input placeholder="Password" type="password" />
                    </FormItem>
                    <Button type="primary" block htmlType="submit">
                        Register
                    </Button>
                    <div className="mt-5 text-center">
                        <span className="text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary">
                                Login
                            </Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
