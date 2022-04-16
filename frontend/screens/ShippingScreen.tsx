import { FC, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "components/FormContainer";
import { AppState } from "store";
import { saveShippingAddress } from "reducers/cartSlice";
import CheckoutSteps from "components/CheckoutSteps";
import Loader from "components/Loader";
import { IProduct } from "interfaces/products.interface";
import { IShippingAddress } from "interfaces/orderUtils.interface";

const ShippingScreen: FC<{
  shippingAddress: IShippingAddress | undefined;
  cartItems: IProduct[] | undefined;
}> = ({ shippingAddress, cartItems }) => {
  const { user } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (!cartItems) {
      router.push("/cart");
    }
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (address && city && postalCode && country) {
      const shippingData = { address, city, postalCode, country };
      dispatch(saveShippingAddress(shippingData));
      localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
      router.push("/payment", undefined, { shallow: true });
    }
  };

  return (
    <>
      {user ? (
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>PostalCode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your PostalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ShippingScreen;
