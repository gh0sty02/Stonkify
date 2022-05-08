import { FC, Fragment, useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";

import { IOrder } from "interfaces/orderUtils.interface";
import IUser from "interfaces/user.interface";

import OrderScreen from "screens/OrderScreen";

import { wrapper } from "store";
import { orderInit, resetOrders } from "reducers/orderSlice";
import { changePaymentStatus, getOrder } from "services/orderApi";
import { tokenLogin } from "services/userApi";

const Order: FC<{ order: IOrder; user: Partial<IUser>; token: string }> = ({
  order,
  user,
  token,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderInit(order));
  }, []);

  return (
    <Fragment>
      <div>
        <Head>
          <title>Stonkify | Order Details</title>
        </Head>
        {order && user && (
          <OrderScreen order={order} user={user} token={token} />
        )}
      </div>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async (context) => {
    const queries = context.query.id as string[];
    const session_id = context.query.session_id as string;
    const id = queries[0];
    const session = await getSession({ req: context.req });
    const token = session?.accessToken as string;

    if (token && session_id) {
      if (session_id) {
        const data = await store.dispatch(
          changePaymentStatus.initiate({ orderId: id, token })
        );
        if ("data" in data) {
          store.dispatch(resetOrders());
          return {
            props: {
              order: data.data as IOrder,
              user: session?.user,
              token,
            },
          };
        }
      }
    }

    if (token) {
      const order = await store.dispatch(
        getOrder.initiate({ orderId: id, token })
      );
      const user = await store.dispatch(tokenLogin.initiate(token));
      if ("data" in order && "data" in user) {
        return {
          props: {
            order: order.data,
            user: user.data,
            token,
          },
        };
      }
    }
    return {
      props: {
        order: null,
        user: null,
      },
      redirect: {
        pathname: "/login",
      },
    };
  }
);

export default Order;
