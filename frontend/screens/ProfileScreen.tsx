import { FC, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Message from "components/Message";
import Loader from "components/Loader";
import RequestError from "interfaces/requestError.interface";
import { useUpdateUserProfileMutation } from "services/userApi";
import { setCredentials } from "reducers/authSlice";
import { IOrder } from "interfaces/orderUtils.interface";

import IUser from "interfaces/user.interface";
import OrderTable from "src/components/OrderTable";
import UpdateUserForm from "src/components/UpdateUserForm";

interface IProps {
  data: {
    user: IUser;
    orders: IOrder[];
    token: string;
  };
}

const ProfileScreen: FC<IProps> = ({ data: { orders, token, user } }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [updateProfile, { isLoading, error, isSuccess, data: updatedUser }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (updatedUser) {
      dispatch(
        setCredentials({
          token: updatedUser?.token as string,
          user: updatedUser,
        })
      );
    }
  }, [updatedUser]);

  return (
    <>
      {user && orders && (
        <Container>
          <Row>
            <Col md={3}>
              <h2>User Profile</h2>
              {message && <Message varient="danger">{message}</Message>}
              {error && (
                <Message varient="danger">
                  {(error as RequestError).data.message}
                </Message>
              )}
              {isSuccess && (
                <Message varient="success">{`Profile Updated Successfully`}</Message>
              )}

              {isLoading && <Loader />}
              <UpdateUserForm user={user} token={token} />
            </Col>
            <Col md={9}>
              <h2>My Order</h2>
              <OrderTable orders={orders} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProfileScreen;
