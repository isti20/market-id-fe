import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

// Import component, layout, page and auth
import App from "../App";

// Customer
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Negative page
import Error from "../pages/Error";

export default createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
        </Route>
    )
);