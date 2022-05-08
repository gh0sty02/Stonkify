import { FC, FormEvent, useState } from "react";
import {
  ListGroup,
  Row,
  Col,
  Image,
  Card,
  Container,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
//@ts-ignore
import Message from "components/Message";
import { IOrder } from "interfaces/orderUtils.interface";
import IUser from "interfaces/user.interface";
import getStripe from "utils/getStripe";
import { fetchPostJSON } from "utils/apiHelper";
import { useChangeDeliveryStatusMutation } from "services/orderApi";
import { orderInit } from "reducers/orderSlice";
import { AppState } from "store";

interface IProps {
  order: IOrder;
  user: Partial<IUser>;
  token: string;
}

const OrderScreen: FC<IProps> = ({ user, token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [changeDeliveryStatus, { isLoading, isSuccess }] =
    useChangeDeliveryStatusMutation();
  const { currentOrder: order } = useSelector((state: AppState) => state.order);

  const deliverProductHandler = async () => {
    if (user?.isAdmin && token && order && order._id && !order.isDelivered) {
      const data = await changeDeliveryStatus({
        orderId: order._id,
        token,
      });
      if ("data" in data) {
        dispatch(orderInit(data.data));
      }
    }
  };

  const paymentHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (order) {
      setLoading(true);
      const response = await fetchPostJSON("/api/checkout_sessions", {
        order,
      });

      // create checkout session
      const stripe = await getStripe();

      const { error } = await stripe!.redirectToCheckout({
        // passing the sessionId of the strip payment to get the payment session
        sessionId: response.id,
      });
      console.warn(error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <>
        {order && user && (
          <>
            <h1>Order {order?._id}</h1>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name :</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email :</strong>{" "}
                      <Link href={`mailto:${user.email}`} passHref>
                        <a>{user.email}</a>
                      </Link>
                    </p>
                    <p>
                      <strong>Address : </strong>
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}{" "}
                      {order.shippingAddress?.postalCode},{" "}
                      {order.shippingAddress?.country}
                    </p>
                    {order.isDelivered ? (
                      <Message varient="success">
                        Delivered On{" "}
                        {moment(order.deliveredAt).format("DD/MM/YYYY")}
                      </Message>
                    ) : (
                      <Message varient="danger">Not Delivered</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method : </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message varient="success">
                        Paid on {moment(order.paidAt).format("DD/MM/YYYY")}
                      </Message>
                    ) : (
                      <Message varient="danger">Not Paid</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order && order?.orderItems.length === 0 ? (
                      <Message>Your Cart is Empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, i) => (
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
                                {(item.qty as number) * (item.price as number)}
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
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                      <ListGroup.Item>
                        <Button
                          target="_blank"
                          style={{ width: "100%" }}
                          type="submit"
                          onClick={paymentHandler}
                        >
                          Pay
                        </Button>
                      </ListGroup.Item>
                    )}
                    {user?.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          style={{ width: "100%" }}
                          onClick={() => {
                            deliverProductHandler();
                          }}
                        >
                          {!isLoading && !isSuccess
                            ? "Mark as Deliver"
                            : "Delivered"}
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </>
      {/* )} */}
    </Container>
  );
};

export default OrderScreen;
