import React, { FC, FormEvent, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";

import IUser from "interfaces/user.interface";

import { reloadSession } from "utils/reloadSession";
import { setCredentials } from "reducers/authSlice";
import { useUpdateUserProfileMutation } from "services/userApi";

const UpdateUserForm: FC<{ user: IUser; token: string }> = ({
  user,
  token,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [updateProfile] = useUpdateUserProfileMutation();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords Don't Match");
    } else {
      if (user && token) {
        const data = await updateProfile({ name, email, password, token });
        if ("data" in data) {
          reloadSession();
          setMessage("Profile Updated");
          dispatch(setCredentials({ user: data.data, token }));
        }
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
      {message && <Alert>{message}</Alert>}
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
    </>
  );
};

export default UpdateUserForm;
