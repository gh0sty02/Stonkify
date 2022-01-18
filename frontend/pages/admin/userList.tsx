import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "reducers/asyncActions/userActions";
import { userInit } from "reducers/userInfoSlice";
import UserListScreen from "screens/UserListScreen";
import { AppState, wrapper } from "store";
import { initData } from "utils/initData";

const UserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = initData();

  const { success } = useSelector((state: AppState) => state.adminUserSlice);

  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }
    if (!user?.isAdmin) {
      router.push("/");
    }

    if (user?.isAdmin && user?.token) {
      dispatch(getUsers(user.token));
    }
  }, []);

  useEffect(() => {
    if (success && user?.isAdmin && user?.token) {
      dispatch(getUsers(user.token));
    }
  }, [success]);
  return (
    <Fragment>
      <Head>
        <title>Stonkify | All Users</title>
      </Head>
      <Container>
        <UserListScreen />
      </Container>
    </Fragment>
  );
};

export default UserList;
