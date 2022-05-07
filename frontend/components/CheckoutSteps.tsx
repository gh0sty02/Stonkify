import { FC } from "react";
import Link from "next/link";
import { Nav } from "react-bootstrap";

const CheckoutSteps: FC<{
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}> = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center  mb-4">
      <Nav.Item>
        {step1 ? (
          <Link href="/login" passHref>
            <Nav.Link>Sign In</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link href="/shipping" passHref>
            <Nav.Link>Shipping</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link href="/payment" passHref>
            <Nav.Link>Payment</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Link href="/placeorder" passHref>
            <Nav.Link>Place Order</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
