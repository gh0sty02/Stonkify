import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUpdateOrderStatusFalse } from "reducers/adminOrderSlice";
import { getOrderDetails, payOrder } from "reducers/asyncActions/orderActions";
import { cartReset, shippingAddressInit } from "reducers/cartSlice";
import { orderInit, resetOrders } from "reducers/orderSlice";
import { userInit } from "reducers/userInfoSlice";
import OrderScreen from "screens/OrderScreen";
import { AppState } from "store";
import { initData } from "utils/initData";

const Order = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isPaid = router.query["paid"];
  const idQuery = router.query?.id as string[];

  const retrieved = initData();
  let order = useSelector((state: AppState) => state.order.order);
  let { user } = useSelector((state: AppState) => state.user);
  let { updateOrderStatus } = useSelector(
    (state: AppState) => state.adminOrderSlice
  );
  if (!order) {
    order = retrieved.order ? retrieved.order : null;
  }
  let id: string;
  if (idQuery) {
    id = idQuery[0];
  }
  useEffect(() => {
    if (id && user && user.token) {
      dispatch(getOrderDetails({ id, token: user.token }));
      dispatch(cartReset());
    }
  }, [id!, user?.token, updateOrderStatus]);

  useEffect(() => {
    if (isPaid && order && user?.token) {
      const orderId = order._id;
      dispatch(
        payOrder({
          id: orderId,
          token: user.token,
        })
      );
    }

    if (updateOrderStatus) {
      dispatch(resetOrders());
      dispatch(setUpdateOrderStatusFalse());
    }

    if (isPaid && retrieved.user && order) {
    }

    if (retrieved.user) {
      dispatch(userInit(retrieved.user));
    }

    if (retrieved.shippingAddress) {
      dispatch(shippingAddressInit(retrieved.shippingAddress));
    }

    if (order) {
      dispatch(orderInit(order));
    }

    if (!retrieved.user) {
      router.push("/login");
    }
  }, [isPaid, updateOrderStatus]);
  return (
    <Fragment>
      <div>
        <Head>
          <title>Stonkify | Order Details</title>
        </Head>
        <OrderScreen />
      </div>
    </Fragment>
  );
};

export default Order;
