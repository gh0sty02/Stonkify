import axios from "axios";
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

import { AppState } from "store";
import Loader from "components/Loader";
import Message from "components/Message";
//@ts-ignore
import { loadStripe } from "@stripe/stripe-js";
import { IOrder } from "interfaces/orderUtils.interface";

import { deliverOrder } from "reducers/asyncActions/orderActions";

interface IProps {
  order: IOrder;
}

const OrderScreen = () => {
  const state = useSelector((state: AppState) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const { order, error, loading } = state.order;
  const { user } = state.user;

  const IdQueries = router.query.id as string[];

  const deliverProductHandler = () => {
    if (
      user?.isAdmin &&
      user.token &&
      !order?.isDelivered &&
      order?.isPaid &&
      IdQueries
    ) {
      dispatch(deliverOrder({ id: IdQueries[0], token: user.token }));
    }
  };

  const successPaymentHandler = async () => {
    const bodyData = {
      itemData: order!.orderItems.map((o) => {
        return {
          name: o.name,
          amount: o.price * o.qty * 7400,
          qty: o.qty,
        };
      }),
      orderId: order?._id,
    };

    const { data } = await axios.post(
      `${process.env.BASE_URL}/api/stripe/getSession`,
      bodyData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY as string);
    if (stripe) {
      stripe.redirectToCheckout({
        sessionId: data.session.id,
      });
    }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          {order && (
            <>
              <h1>Order {order?._id}</h1>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Shipping</h2>
                      <p>
                        <strong>Name :</strong> {order.user.name}
                      </p>
                      <p>
                        <strong>Email :</strong>{" "}
                        <Link href={`mailto:${order.user.email}`} passHref>
                          <a>{order.user.email}</a>
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
                      {order.orderItems.length === 0 ? (
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
                                  <Link href={`/product/${item._id}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={4}>
                                  {item.qty} x ${item.price} = $
                                  {(item.qty as number) *
                                    (item.price as number)}
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
                            style={{ width: "100%" }}
                            onClick={() => {
                              successPaymentHandler();
                            }}
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
                            Mark As Delivered
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
      )}
    </Container>
  );
};

export default OrderScreen;
