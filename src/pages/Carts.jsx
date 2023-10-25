import { Row, Col } from "react-bootstrap";
import ABreadCrumb from "../components/ABreadCrumb";
import { useSelector } from "react-redux";
import ItemCart from "../components/cart/Item";
import CardCheckout from "../components/cart/CardCheckout";

export default function Cart() {
    const options = [
        {
          href: "/",
          name: "Landing Page",
          active: false,
        },
        {
          href: "/cart",
          name: "Cart",
          active: true,
        },
    ];
    
    const storeCarts = useSelector((state) => state.carts);
    return (
        <>
          <Row>
            <Col xs="12">
                <ABreadCrumb options={options} />
            </Col>
            <Col md="8" sm="12" xs="12">
              <div style={{ height: "25rem", overflowY: "auto" }}>
                {storeCarts.dataCart.length ? (
                  storeCarts.dataCart.map((cart, index) => (
                    <ItemCart 
                      key={`item-cart-${cart._id}`}
                      cart={cart}
                      index={index}
                    />
                  ))
                ) : (
                  <h4>Cart list empty</h4>
                )}
              </div>
            </Col>
            <Col md="4" sm="12" xs="12">
              <CardCheckout isCheckout/>
            </Col>
          </Row>
        </>
    );
}