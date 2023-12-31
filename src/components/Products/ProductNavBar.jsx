import "../../assets/css/custom-product-navbar.css";
import { Navbar, Container, Nav, InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";

import { axiosInstance as axios } from "../../config/https";

function ProductNavBar() {
    // STORE AUTH
    const { token, user } = useSelector((state) => state.auth);
    const { q, sort_by } = useSelector((state) => state.product);
    const { dataCart } = useSelector((state) => state.carts);

    const dispatch = useDispatch();

    // Item qty & countQty
    const itemQty = dataCart.map((item) => item.qty)
    const countQty = itemQty.reduce((a, b) => a + b, 0)

    // STATE
    const [params, setParams] = useState({
        q,
        sort_by,
    });

    function handleOnChange(event) {
        setParams({ ...params, [event.target.name]: event.target.value });
    };

    function handleSubmit(event) {
        event.preventDefault();

        console.log("ini", params.q, q);

        // SET VALUE PARAMS Q & SORTBY TO STORE PRODUCT
        dispatch({ type: "ACTION_PAGE", value: 1 });
        dispatch({ type: "ACTION_SEARCH", value: params.q });
        dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
    }

    function handleLogout() {
        const _id = user._id;

        dispatch({ type: "SET_LOADING", value: true });
        axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/logout`)
        .then((response) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // TO PAGE LOGIN
            window.location.href = "/login";
        })
        .catch((error) => {
            const message = error.response?.data?.message;
            toast(handleErrorMessage(message), {
                position: toast.POSITION.TOP_RIGHT,
                type: toast.TYPE.ERROR,
            });
        })
        .finally(() => {
            dispatch({ type: "SET_LOADING", value: false });
        });
    }

    const navigate = useNavigate();
    function handleProfile() {
       navigate("/profile") 
    }

    function handleToPageCart() {
        navigate("/cart");
    }

    return (
        <Navbar bg="primary" expand="md" variant="dark">
            <Container>
                <Navbar.Brand href="/" className="heading__4">
                    Market.ID 
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="w-100 d-flex justify-content-center align-items-center">
                        <Form className="container_search mt-3 my-md-0" onSubmit={handleSubmit}>
                            <InputGroup>
                                <Form.Select 
                                className="select__search"
                                name="sort_by"
                                value={params.sort_by}
                                onChange={handleOnChange}
                                >
                                    <option value="asc">ASC</option>
                                    <option value="desc">DESC</option>
                                </Form.Select>
                                <Form.Control 
                                    placeholder="Search by product name"
                                    className="input__search border-0"
                                    name="q"
                                    value={params.q}
                                    onChange={handleOnChange}
                                />
                                <Button 
                                type="submit"
                                variant="light" 
                                className="d-flex align-items-center">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Form>
                    </Nav>

                    <Nav>
                        {token ? (
                            <>
                              <Button
                                disabled={countQty === 0}
                                className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light d-flex justify-content-center 
                                align-items-center"
                                onClick={handleToPageCart}
                              >
                                <i className="bi bi-cart-fill"></i>
                                <span className="sub__heading__5">{countQty}</span>
                              </Button>

                              <Button variant="outline-light" className="mx-2" onClick={handleProfile}>
                                Profil
                              </Button>

                              <Button variant="light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                              <Link to="/login" className="me-md-3 my-3 my-md-0 me-0 ms-md-3 btn btn-outline-light">Login</Link>
                              <Link to="/register" className="text-primary btn btn-light">Register</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ProductNavBar;