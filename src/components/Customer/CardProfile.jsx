import { Form, Card, Row, Col, Image, Button } from "react-bootstrap";
import ImgProfile from "../../assets/images/profile.png?url";

export default function CardProfile() {
    return (
        <Form>
            <Card className="p-4 mt-md-0 mt-3">
                <Card.Body>
                    <Row>
                        {/* IMAGE PROFILE */}
                        <Col lg="3" xs="12" className="text-center">
                            <Image src={ImgProfile} rounded className="w-full mx-auto" />
                        </Col>

                        {/* INPUT LEFT */}
                        <Col lg="5" xs="12" className="mt-lg-0 mt-2 mb-2">
                            <Form.Group className="mb-2">
                                <Form.Label htmlFor="full_name" className="mb-2">
                                    Full Name
                                </Form.Label>
                                <Form.Control
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    placeholder="Full name"
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label htmlFor="email" className="mb-2">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                />
                            </Form.Group>
                        </Col>

                        {/* INPUT RIGHT */}
                        <Col lg="4" xs="12">
                            <Form.Group className="mb-2">
                                <Form.Label htmlFor="image" className="mb-2">
                                    Image
                                </Form.Label>
                                <Form.Control
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    placeholder="Choose image"
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label htmlFor="password" className="mb-2">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                        </Col>

                        {/* ACTION */}
                        <Col className="mt-2 d-flex justify-content-end">
                            <Button type="button" variant="light" className="me-2">Cancel</Button>
                            <Button type="submit" variant="success">Update</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Form>
    )
}