import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../apicalls/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { message, Badge, Avatar } from "antd";
import { SetLoader } from "../redux/loaderSlice.js";
import { SetUser } from "../redux/userSlice.js";
import Notification from "./Notification.js";
import { getNotifications, markAsRead } from "../apicalls/noification.js";

function ProtectedPage({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const getAllNotifications = async () => {
        try {
            dispatch(SetLoader(true));
            const ret = await getNotifications();
            dispatch(SetLoader(false));
            if (ret.success) {
                setNotifications(ret.data);
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const markNotificationsAsRead = async () => {
        try {
            await markAsRead();
        } catch (error) {
            message.error(error.message);
        }
    };
    const checkUserActived = async () => {
        // dispatch(SetLoader(true));
        try {
            const ret = await getCurrentUser();
            //dispatch(SetLoader(false));
            if (ret.success && ret.data.status === "active") {
                dispatch(SetUser(ret.data));
            } else {
                navigate("/login");
                message.error(ret.message);
            }
        } catch (error) {
            //dispatch(SetLoader(false));
            message.error(error.message);
            navigate("/login");
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkUserActived();
            getAllNotifications();
        } else {
            navigate("/login");
        }
    }, []);
    return (
        user && (
            <div>
                {/* header */}
                <div className="flex justify-between items-center bg-primary p-5">
                    <h1>
                        <Link to="/" className="text-white no-underline">
                            IOWA MARKET PLACE
                        </Link>
                    </h1>
                    <div className="bg-white rounded-full flex gap-3 items-center cursor-pointer p-3">
                        {/* <i className="ri-user-2-fill "></i> */}
                        <span
                            className="cursor-pointer uppercase underline "
                            onClick={() => {
                                if (user.role === "user") {
                                    navigate("/profile");
                                } else {
                                    navigate("/admin");
                                }
                            }}
                        >
                            {user.name}
                        </span>
                        <Badge
                            count={
                                notifications?.filter((notif) => !notif.read)
                                    .length
                            }
                            onClick={() => {
                                markNotificationsAsRead();
                                setShowNotifications(true);
                            }}
                            className="cursor-pointer"
                        >
                            <Avatar
                                shape="circle"
                                icon={<i className="ri-notification-line"></i>}
                            />
                        </Badge>
                        <i
                            className="ri-logout-box-r-line ml-7"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}
                        ></i>
                    </div>
                </div>
                {/* body */}
                <div className="p-5">{children}</div>
                <div>
                    {
                        <Notification
                            showNotifications={showNotifications}
                            setShowNotifications={setShowNotifications}
                            notifications={notifications}
                            getAllNotifications={getAllNotifications}
                        />
                    }
                </div>
            </div>
        )
    );
}

export default ProtectedPage;
