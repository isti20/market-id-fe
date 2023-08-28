import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

// Import component, layout, page and auth
import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";

export default createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
        </Route>
    )
);