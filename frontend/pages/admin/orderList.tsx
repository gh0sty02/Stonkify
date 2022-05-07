import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { getAllOrders } from "reducers/asyncActions/orderActions";
import { userInit } from "reducers/userInfoSlice";
import OrderListScreen from "screens/OrderListScreen";
import { initData } from "utils/initDataOld";

const UserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = initData();

  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }
    if (!user?.isAdmin) {
      router.push("/");
    }

    if (user?.isAdmin && user?.token) {
      dispatch(getAllOrders(user.token));
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | All Orders</title>
      </Head>
      <Container>
        <OrderListScreen />
      </Container>
    </Fragment>
  );
};

export default UserList;
