import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "components/FormContainer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { register } from "reducers/asyncActions/userActions";
import { AppState } from "store";
import Message from "components/Message";
import Loader from "components/Loader";
import { useRegisterMutation } from "services/userApi";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const { user, error, loading } = useSelector((state: AppState) => state.user);
  const [register, { isLoading, isError }] = useRegisterMutation();

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
    const name = nameRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      setMessage("Passwords Don't Match");
    } else {
      if (email && password && name) {
        register({ email, password, name });
      }
    }
  };

  return (
    <FormContainer>
      <h1>Signin</h1>
      {message && <Message varient="danger">{message}</Message>}
      {error && <Message varient="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your Name"
            ref={nameRef}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email"
            ref={emailRef}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            ref={passwordRef}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          {" "}
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          {" "}
          Existing Customer ?{" "}
          <Link href={redirect ? `/login?redirect=${redirect}` : "/login"}>
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
