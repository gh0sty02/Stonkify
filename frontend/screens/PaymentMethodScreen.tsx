import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "components/FormContainer";
import { savePaymentMethod } from "reducers/cartSlice";
import { AppState } from "store";
import CheckoutSteps from "components/CheckoutSteps";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { shippingAddress } = useSelector((state: AppState) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      router.push("/shipping");
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Stripe or Credit Card"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              className="pb-3"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
