import { IOrder } from "interfaces/orderUtils.interface";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderInit, setAllOrders, setUserOrders } from "reducers/orderSlice";

import ProfileScreen from "screens/ProfileScreen";
import { getMyOrders, useGetMyOrdersMutation } from "services/orderApi";
import cookie from "cookie";
import { AppState, wrapper } from "store";
import { getSession } from "next-auth/react";
import IUser from "interfaces/user.interface";
import { tokenLogin } from "services/userApi";
import { userInit } from "reducers/authSlice";

const Profile: FC<{ user: IUser; token: string; orders: IOrder[] }> = ({
  user,
  token,
  orders,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInit(user));
  }, [user]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | {`${user?.name}'s Profile`}</title>
      </Head>
      <div>
        {user && orders && <ProfileScreen data={{ user, orders, token }} />}
      </div>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const session = await getSession({ req });
      const token = session?.accessToken as string;
      if (token) {
        const user = await store.dispatch(tokenLogin.initiate(token));
        const orders = await store.dispatch(getMyOrders.initiate(token));

        if ("data" in user && "data" in orders) {
          const userDetails = user.data as IUser;
          const orderDetails = orders.data as IOrder[];
          store.dispatch(userInit(userDetails));
          store.dispatch(setAllOrders(orderDetails));

          return {
            props: {
              user: userDetails,
              orders: orderDetails,
              token,
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

export default Profile;
