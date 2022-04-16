import { IOrder } from "interfaces/orderUtils.interface";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrders } from "reducers/orderSlice";

import ProfileScreen from "screens/ProfileScreen";
import { useGetMyOrdersMutation } from "services/orderApi";

import { AppState } from "store";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state: AppState) => state.auth);
  const [getMyOrders, { isLoading: ordersLoading, error: ordersError }] =
    useGetMyOrdersMutation();

  const useInitUserOrders = async (token: string) => {
    const orders = await getMyOrders({ token });

    if ("data" in orders) {
      dispatch(setUserOrders(orders.data as IOrder[]));
    }
  };

  useEffect(() => {
    if (token) {
      console.log("user yes");

      useInitUserOrders(token);
    }
  }, [token]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | {`${user?.name}'s Profile`}</title>
      </Head>
      <div>{<ProfileScreen />}</div>
    </Fragment>
  );
};

export default Profile;
