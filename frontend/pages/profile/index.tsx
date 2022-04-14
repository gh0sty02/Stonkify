import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMyOrders } from "reducers/asyncActions/orderActions";
import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { userInit } from "reducers/userInfoSlice";
import ProfileScreen from "screens/ProfileScreen";
import { useLoginMutation } from "services/userApi";
import { initData } from "utils/initData";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [_, { data: user }] = useLoginMutation();

  const { cartItems, shippingAddress } = initData();

  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }

    if (cartItems) {
      dispatch(cartInit(cartItems));
    }
    if (shippingAddress) {
      dispatch(shippingAddressInit(shippingAddress));
    }

    if (user && user.token) {
      dispatch(getMyOrders(user.token));
    }

    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | {`${user?.name}'s Profile`}</title>
      </Head>
      <div>
        <ProfileScreen />
      </div>
    </Fragment>
  );
};

export default Profile;
