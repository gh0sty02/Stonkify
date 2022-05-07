import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "components/FormContainer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppState, wrapper } from "store";
import Message from "components/Message";
import Loader from "components/Loader";
import { useRegisterMutation } from "services/userApi";
import { setCredentials } from "reducers/authSlice";
import RequestError from "interfaces/requestError.interface";
import { useCookies } from "react-cookie";
import cookie from "cookie";
import { signIn, useSession } from "next-auth/react";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const user = useSelector((state: AppState) => state.auth.user);
  const [cookie, setCookie] = useCookies();
  const session = useSession();

  const redirectUrl = (
    router.query["redirect"] ? router.query["redirect"] : "/"
  ) as string;

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      setMessage("Passwords Don't Match");
    } else {
      if (email && password && name) {
        register({ email, password, name }).then((data) => {
          if ("data" in data) {
            dispatch(
              setCredentials({
                user: data.data,
                token: data.data.token as string,
              })
            );
            signIn("credentials", {
              email,
              password,
              callbackUrl: redirectUrl,
            });
          }
        });
      }
    }
  };

  return (
    <FormContainer>
      <h1>Signin</h1>
      {message && <Message varient="danger">{message}</Message>}
      {error && (
        <Message varient="danger">
          {(error as RequestError).data.message}
        </Message>
      )}
      {isLoading && <Loader />}
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
          <Link
            href={redirectUrl ? `/login?redirect=${redirectUrl}` : "/login"}
          >
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
