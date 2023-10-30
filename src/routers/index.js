import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE AND AUTH
import App from "../App";

// LAYOUT PRODUCT
import LayoutProduct from "../layouts/LayoutProduct";
import LayoutCart from "../layouts/LayoutCart";
import LayoutCustomer from "../layouts/LayoutCustomer";

// LAYOUT AUTH
import LayoutAuth from "../layouts/LayoutAuth";

// PAGE CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Carts from "../pages/Carts";
import Invoices from "../pages/Invoices";
import Profile from "../pages/Profile";
import History from "../pages/History";


// NEGATIVE PAGE
import Error from "../pages/Error";

import store from "../stores";
const { auth } = store.getState();

export default createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>

            {/* PRODUCT */}
            <Route element={
                <LayoutAuth auth={auth}>
                    <LayoutProduct />
                </LayoutAuth>
            }>
                <Route path="/" element={<Products />}/>
            </Route>

            {/* CART & INVOICE */}
            <Route element={
                <LayoutAuth auth={auth}>
                    <LayoutCart />
                </LayoutAuth>
            }>
                <Route path="/cart" element={<Carts />}/>
                <Route path="/invoice/:code" element={<Invoices/>}/>
            </Route>

            {/* CUSTOMER */}
            <Route
                element={
                    <LayoutAuth auth={auth} children={<LayoutCustomer />} />
                }
            >
                <Route path="/profile" element={<Profile />} />
                <Route path="/history" element={<History />} />
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