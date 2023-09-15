import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE AND AUTH
import App from "../App";

// LAYOUT PRODUCT
import LayoutProduct from "../layouts/LayoutProduct";

// LAYOUT AUTH
import LayoutAuth from "../layouts/LayoutAuth";

// PAGE CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";

// NEGATIVE PAGE
import Error from "../pages/Error";

import store from "../stores";
const { auth } = store.getState();

export default createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>

            <Route element={
                <LayoutAuth auth={auth}>
                    <LayoutProduct />
                </LayoutAuth>
            }>
                <Route path="/" element={<Products />}/>
            </Route>

            {/* PAGE LOGIN & REGISTER */}
            <Route
                element={
                    <LayoutAuth auth={auth}>
                        <App />
                    </LayoutAuth>
                }
            >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* NEGATIVE PAGE OR 404 */}
            <Route path="*" element={<Error />} />
        </Route>
    )
);