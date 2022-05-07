import Link from "next/link";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "components/Loader";
import Message from "components/Message";

import { FC } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "services/userApi";
import IUser from "interfaces/user.interface";
import RequestError from "interfaces/requestError.interface";

interface IProps {
  data: {
    users: IUser[];
    user: Partial<IUser>;
    token: string;
  };
}

const UserListScreen: FC<IProps> = ({ data: { users, token, user } }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, data, refetch } =
    useGetAllUsersQuery(token);
  const [deleteUser] = useDeleteUserMutation();

  type data = {
    id: string;
    token: string;
  };

  const deleteHandler = (data: data) => {
    if (window.confirm("Are You Sure ?")) {
      deleteUser({ id: data.id, token: data.token });
    }
  };
  return (
    <>
      {users && token && user.isAdmin && (
        <>
          <h1>Users</h1>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message varient="danger">
              {(error as RequestError).data.message}
            </Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <Link href={`mailto:${user.email}`}>{user.email}</Link>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>{user._id}</td>
                    <td>
                      <Link href={`/admin/user/${user._id}`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() =>
                          deleteHandler({
                            id: user._id,
                            token: token,
                          })
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};
export default UserListScreen;
