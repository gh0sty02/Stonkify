import { FormEvent, Fragment, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useSession, signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";

import FormContainer from "components/FormContainer";
import Message from "components/Message";
import Loader from "components/Loader";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const redirectUrl = (
    router.query["redirect"] ? router.query["redirect"] : "/"
  ) as string;

  if (session.data?.user) {
    router.push(redirectUrl);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      setLoading(true);
      signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: redirectUrl,
        //@ts-ignore
      }).then((res: SignInResponse) => {
        if (res.ok) {
          setLoading(false);
        } else {
          setError("Invalid email or password");
        }
        setLoading(false);
      });
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
              href={
                redirectUrl ? `/register?redirect=${redirectUrl}` : "/register"
              }
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
