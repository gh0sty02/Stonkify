import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "store";
import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import Message from "components/Message";
import { getUserDetails, updateUser } from "reducers/asyncActions/userActions";

const UserEditScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state: AppState) => state.user);
  const { user, error, loading } = useSelector(
    (state: AppState) => state.adminUserSlice
  );

  const queryArray = router.query.id as string[];

  const id = queryArray[0];

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserDetails({ id, token: currentUser?.token as string }));
    }
  }, [id]);
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const user = { name, email, isAdmin };
      dispatch(updateUser({ user, id, token: currentUser.token as string }));
      router.push("/admin/userList");
    }
  };

  return (
    <>
      <Link href="/admin/userList" passHref>
        <a className="btn btn-light my-3">Go Back</a>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mb-3"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                value={email}
                className="mb-3"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mb-3"
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              {" "}
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
