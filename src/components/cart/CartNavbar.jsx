import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function CartNavbar() {
    const navigate = useNavigate();

    function handleGoToProfile() {
        navigate("/profile");
    }

    return (
        <Navbar bg="primary" expand="md" variant="dark">
            <Container>
                <Navbar.Brand href="/" className="heading__4">
                    MARKET.ID
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Nav className="d-flex justify-content-end w-100">
                        <Button variant="light" onClick={handleGoToProfile}>
                            Profile
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CartNavbar;