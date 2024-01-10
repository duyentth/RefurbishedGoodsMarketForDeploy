import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProtectedPage from "./components/ProtectedPage.js";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import ProductInfo from "./pages/ProductInfo";
import Payment from "./pages/Payment/index.js";

function App() {
    const { loading } = useSelector((state) => state.loader);
    return (
        <Fragment>
            {loading && <Spinner />}
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedPage>
                                <Home />
                            </ProtectedPage>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedPage>
                                <Profile />
                            </ProtectedPage>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedPage>
                                <Admin />
                            </ProtectedPage>
                        }
                    />
                    <Route
                        path="/products/:productId"
                        element={
                            <ProtectedPage>
                                <ProductInfo />
                            </ProtectedPage>
                        }
                    />
                    <Route
                        path="/payment/:bidId"
                        element={
                            <ProtectedPage>
                                <Payment />
                            </ProtectedPage>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
