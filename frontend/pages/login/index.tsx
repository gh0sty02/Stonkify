import Link from "next/link";
import { FormEvent, Fragment, useEffect, useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "components/FormContainer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { login } from "reducers/asyncActions/userActions";
import { AppState } from "store";
import Message from "components/Message";
import Loader from "components/Loader";
import Head from "next/head";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state: AppState) => state.user);

  const redirect = (
    router.query["redirect"] ? router.query["redirect"] : "/"
  ) as string;

  if (user) {
    router.push(`${redirect}`, undefined, { shallow: true });
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Welcome to Stonkify | Login</title>
      </Head>
      <FormContainer>
        <h1>Signin</h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              ref={emailRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              ref={passwordRef}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            {" "}
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            {" "}
            New Customer ?{" "}
            <Link
              href={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Fragment>
  );
};

export default Login;
