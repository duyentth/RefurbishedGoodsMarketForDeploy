import React, { Fragment, useEffect, useState } from "react";
import { Table, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice.js";
import { getAllUsers, updateUser } from "../../apicalls/auth.js";

function Users() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const onStatusUpdate = async (userId, newStatus) => {
        try {
            //dispatch(SetLoader(true));
            const ret = await updateUser(userId, { status: newStatus });
            //dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);
                getData();
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            //dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const ret = await getAllUsers();
            dispatch(SetLoader(false));
            if (ret.success) {
                setUsers(ret.data);
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
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
        },

        {
            title: "Created On",
            dataIndex: "createdAt",
            render: (text, record) =>
                moment(record.createdAt).format("MM-DD-YYYY hh:mm A"),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record;
                return (
                    <div className=" flex gap-5 items-center">
                        {status === "active" && (
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
                                onClick={() => onStatusUpdate(_id, "active")}
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
            <Table columns={columns} dataSource={users} />
        </Fragment>
    );
}

export default Users;
