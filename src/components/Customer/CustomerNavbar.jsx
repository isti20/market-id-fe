import { Container, Navbar } from "react-bootstrap";

function CustomerNavbar() {
    return (
        <Navbar bg="primary" expand="md" variant="dark">
            <Container>
                <Navbar.Brand href="/" className="heading__4">
                    MARKET.ID
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default CustomerNavbar;