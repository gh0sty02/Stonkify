import { IOrder } from "interfaces/orderUtils.interface";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUpdateOrderStatusFalse } from "reducers/adminOrderSlice";
import { getOrderDetails, payOrder } from "reducers/asyncActions/orderActions";
import { cartReset, shippingAddressInit } from "reducers/cartSlice";
import { orderInit, resetOrders, setOrder } from "reducers/orderSlice";
import { userInit } from "reducers/userInfoSlice";
import OrderScreen from "screens/OrderScreen";
import { getOrder, useGetOrderMutation } from "services/orderApi";
import { AppState, makeStore, wrapper } from "store";
import { initData } from "utils/initData";

const Order: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isPaid = router.query["paid"];
  const idQuery = router.query?.id as string[];
  const [getOrder] = useGetOrderMutation();
  const { currentOrder } = useSelector((state: AppState) => state.order);

  let { user, token } = useSelector((state: AppState) => state.auth);

  // let { updateOrderStatus } = useSelector(
  //   (state: AppState) => state.adminOrderSlice
  // );

  const getCurrentOrder = async (id: string) => {
    const orders = await getOrder(id);

    if ("data" in orders) {
      dispatch(setOrder(orders.data as IOrder));
    }
  };

  useEffect(() => {
    if (id && token) {
      getCurrentOrder(id);
    }
  }, [id, token]);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.query.id as string;

    return {
      props: {
        id,
      },
    };
  }
);

export default Order;
