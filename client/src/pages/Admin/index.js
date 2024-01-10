import React, { Fragment } from "react";
import { Tabs } from "antd";
import Products from "./Products.js"
import Users from "./Users.js";
function Admin() {
    return (
        <Fragment>
            <Tabs>
                <Tabs.TabPane tab="Products" key="1"><Products/></Tabs.TabPane>
                <Tabs.TabPane tab="Users" key="2"><Users/></Tabs.TabPane>
            </Tabs>
        </Fragment>
    );
}

export default Admin;
