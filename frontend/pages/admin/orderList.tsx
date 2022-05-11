import { FC, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { IOrder } from "interfaces/orderUtils.interface";
import IUser from "interfaces/user.interface";

import { wrapper, makeStore } from "store";
import OrderListScreen from "screens/OrderListScreen";
import { getAllOrders } from "services/orderApi";

const UserList: FC<{ orders: IOrder[]; user: IUser; token: boolean }> = ({
  orders,
  user,
  token,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>Stonkify | All Orders</title>
      </Head>
      <Container>
        {orders && user.isAdmin && (
          <OrderListScreen data={{ orders, user, token }} />
        )}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async (context) => {
    const store = makeStore();
    const session = await getSession({ req: context.req });
    const token = session?.accessToken as string;
    const user = session?.user as Partial<IUser>;

    const orders = await store.dispatch(getAllOrders.initiate(token));
    if (token && user.isAdmin) {
      if ("data" in orders) {
        return {
          props: {
            token,
            orders: orders.data,
            user,
          },
        };
      }
    }

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
);

export default UserList;
