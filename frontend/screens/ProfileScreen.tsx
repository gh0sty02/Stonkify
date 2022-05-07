import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Container, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";

import { updateProfile } from "reducers/asyncActions/userActions";
import { AppState } from "store";
import Message from "components/Message";
import Loader from "components/Loader";
import { orderApi, useGetMyOrdersMutation } from "services/orderApi";
import RequestError from "interfaces/requestError.interface";
import { useUpdateUserProfileMutation } from "services/userApi";
import { setCredentials } from "reducers/authSlice";
import { IOrder } from "interfaces/orderUtils.interface";
import { useInitUserOrders } from "utils/useInitUserOrders";
import { setUserOrders } from "reducers/orderSlice";
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

  // const [getMyOrders, { isLoading: ordersLoading, error: ordersError }] =
  //   useGetMyOrdersMutation();

  // const orders = useSelector((state: AppState) => state.order.userOrders);

  const [updateProfile, { isLoading, error, isSuccess, data: updatedUser }] =
    useUpdateUserProfileMutation();

  // const useInitUserOrders = async (token: string) => {
  //   const orders = await getMyOrders({ token });

  //   if ("data" in orders) {
  //     dispatch(setUserOrders(orders.data as IOrder[]));
  //   }
  // };

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

  // const submitHandler = (e: FormEvent) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setMessage("Passwords Don't Match");
  //   } else {
  //     if (user && user.token) {
  //       updateProfile({ name, email, password });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name as string);
  //     setEmail(user.email as string);
  //   }
  // }, [user]);

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
