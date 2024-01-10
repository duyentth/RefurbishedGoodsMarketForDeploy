import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: "#0D96B4",
                        colorPrimaryHover: "#0D96B4",
                        borderRadius: "2px",
                    },
                },
                token: {
                    borderRadius: "2px",
                    colorPrimary: "#0D96B4",
                },
            }}
        >
            <App />
        </ConfigProvider>
    </Provider>
);
