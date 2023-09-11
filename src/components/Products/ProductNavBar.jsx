import "../../assets/css/custom-product-navbar.css";
import { Navbar, Container, Nav, InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductNavBar() {
    return (
        <Navbar bg="primary" expand="md" variant="dark">
            <Container>
                <Navbar.Brand href="/" className="heading__4">
                    Market.ID
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="w-100 d-flex justify-content-center align-items-center">
                        <Form className="container__search mt-3 my-md-0">
                            <InputGroup>
                                <Form.Select className="select__search">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Form.Control 
                                    placeholder="Search by product name"
                                    className="input__search border-0"
                                />
                                <Button variant="light" className="d-flex align-items-center">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Form>
                    </Nav>

                    <Nav>
                        <Link to="/login" className="me-md-3 my-3 my-md-0 me-0 ms-md-3 btn btn-outline-light">Login</Link>
                        <Link to="/register" className="text-primary btn btn-light">Register</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ProductNavBar;