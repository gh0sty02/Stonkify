import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Container, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";

import { updateProfile } from "reducers/asyncActions/userActions";
import { AppState } from "store";
import Message from "components/Message";
import Loader from "components/Loader";

const ProfileScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { user, error, loading, updateSuccess } = useSelector(
    (state: AppState) => state.user
  );
  const {
    orders,
    error: ordersError,
    loading: ordersLoading,
  } = useSelector((state: AppState) => state.order);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords Don't Match");
    } else {
      if (user && user.token) {
        dispatch(
          updateProfile({ name, email, password, token: user.token as string })
        );
      }
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name as string);
      setEmail(user.email as string);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <Container>
          <Row>
            <Col md={3}>
              <h2>User Profile</h2>
              {message && <Message varient="danger">{message}</Message>}
              {error && <Message varient="danger">{error}</Message>}
              {updateSuccess && (
                <Message varient="success">{`Profile Updated Successfully`}</Message>
              )}

              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter your Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">
                  {" "}
                  Update
                </Button>
              </Form>
            </Col>
            <Col md={9}>
              <h2>My Order</h2>
              {ordersLoading ? (
                <Loader />
              ) : ordersError ? (
                <Message varient="danger">{ordersError}</Message>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt?.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            moment(order?.paidAt).format("DD-MM-YYYY")
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt?.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link href={`/orders/${order._id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfileScreen;
