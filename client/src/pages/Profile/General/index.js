import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function General() {
    const { user } = useSelector((state) => state.user);

    return (
        <div className="flex flex-col gap-2 justify-start">
            <div className=" flex gap-20  ">
                <p>Name:</p>
                <p> {user.name}</p>
            </div>
            <div className=" flex gap-20 ">
                <p>Email:</p>
                <p> {user.email}</p>
            </div>
            <div className=" flex gap-10 ">
                <p>Created On:</p>
                <p> {moment(user.createdAt).format("DD-MM-YYYY hh:mm a")}</p>
            </div>
        </div>
    );
}

export default General;
