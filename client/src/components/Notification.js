import { Modal, message } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { deleteNotificationById } from "../apicalls/noification";

function Notification({
    showNotifications,
    setShowNotifications,
    notifications,
    getAllNotifications,
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteNotification = async (id) => {
        try {
            //dispatch(SetLoader(true));
            const ret = await deleteNotificationById(id);
            // dispatch(SetLoader(false));
            if (ret.success) {
                message.success(ret.message);
                setShowNotifications(false);
                getAllNotifications();
            } else {
                message.error(ret.message);
            }
        } catch (error) {
            //dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    return (
        <Modal
            title="Notifications"
            open={showNotifications}
            onCancel={() => setShowNotifications(false)}
            footer={null}
            centered
            width={1000}
        >
            <div className="flex flex-col gap-2">
                {notifications.map((notification) => (
                    <div
                        className="flex flex-col border border-solid p-2 border-gray-300 rounded cursor-pointer"
                        key={notification._id}
                    >
                        <div className="flex justify-between items-center">
                            <div
                                onClick={() => {
                                    navigate(notification.onClick);
                                    setShowNotifications(false);
                                    getAllNotifications();
                                }}
                            >
                                <h1 className="text-gray-700">
                                    {notification.title}
                                </h1>
                                <span className="text-gray-600">
                                    {notification.message}
                                </span>
                                <h1 className="text-gray-500 text-sm">
                                    {moment(notification.createdAt).fromNow()}
                                </h1>
                            </div>
                            <i
                                className="ri-delete-bin-line"
                                onClick={() => {
                                    deleteNotification(notification._id);
                                }}
                            ></i>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}

export default Notification;
