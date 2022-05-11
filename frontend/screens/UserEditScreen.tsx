import { FC, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import FormContainer from "components/FormContainer";
import IUser from "interfaces/user.interface";
import { useUpdateUserMutation } from "services/userApi";

interface IProps {
  data: {
    user: IUser;
    token: string;
    id: string;
  };
}

const UserEditScreen: FC<IProps> = ({ data: { user, token, id } }) => {
  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);
  const [isAdmin, setIsAdmin] = useState<boolean>(user.isAdmin);
  const router = useRouter();
  const [updateUser, { isLoading: updateUserLoading, error: updateUserError }] =
    useUpdateUserMutation();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const user = { name, email, isAdmin };
    updateUser({
      body: user,
      id,
      token,
    });
    router.push("/admin/userList");
  };

  return (
    <>
      <Link href="/admin/userList" passHref>
        <a className="btn btn-light my-3">Go Back</a>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

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
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
