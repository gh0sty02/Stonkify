import {
  ListGroup,
  Row,
  Col,
  Container,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect } from "react";

import CheckoutSteps from "components/CheckoutSteps";
import Message from "components/Message";
import { AppState } from "store";
import { IShippingAddress } from "interfaces/orderUtils.interface";
import { useCreateOrderMutation } from "services/orderApi";
import RequestError from "interfaces/requestError.interface";
import { setOrder } from "reducers/orderSlice";
import { useSession } from "next-auth/react";
import { shippingAddressInit, cartInit } from "reducers/cartSlice";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const shippingAddress = localStorage.getItem("shippingAddress");
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (shippingAddress && cartItems.length > 0) {
      dispatch(shippingAddressInit(JSON.parse(shippingAddress)));
      dispatch(cartInit(cartItems));
    }
  }, []);
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state: AppState) => state.cart
  );

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

  const session = useSession();
  const token = session.data?.accessToken as string;

  // calculate price
  const addDecimals = (n: number) =>
    Number((Math.round(n * 100) / 100).toFixed(2));

  const itemsPrice = addDecimals(
    cartItems.reduce(
      (acc, item) => acc + (item.price as number) * (item.qty as number),
      0
    )
  );

  const taxPrice = addDecimals(Number(0.15 * Number(itemsPrice)));

  const shippingPrice = addDecimals(itemsPrice > 0 ? 0 : 100);

  const totalPrice = Number(
    (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
  );

  const { currentOrder, success, loading } = useSelector(
    (state: AppState) => state.order
  );

  const cartProducts = cartItems.map((item) => {
    return {
      productId: item.productId as string,
      qty: item.qty as number,
      price: item.price as number,
      name: item.name as string,
      image: item.image as string,
    };
  });

  const placeOrderHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (paymentMethod && token) {
      const order = await createOrder({
        orderItems: cartProducts,
        shippingAddress: shippingAddress as IShippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        token,
        isPaid: false,
      });

      if ("data" in order) {
        dispatch(setOrder(order.data));

        router.push(`/orders/${order.data._id}`);
      }
    }
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {shippingAddress?.address}, {shippingAddress?.city}{" "}
                {shippingAddress?.postalCode}, {shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method : </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`${process.env.BACKEND_URL}${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link href={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(
                            (item.qty as number) * (item.price as number)
                          ).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message varient="error">
                    {(error as RequestError).data.message}
                  </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                  style={{ width: "100%" }}
                >
                  {" "}
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
