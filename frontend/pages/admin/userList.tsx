import IUser from "interfaces/user.interface";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "reducers/asyncActions/userActions";
import { userInit } from "reducers/userInfoSlice";
import UserListScreen from "screens/UserListScreen";
import { getAllUsers } from "services/userApi";
import { AppState, wrapper } from "store";

const UserList: FC<{ users: IUser[]; user: Partial<IUser>; token: string }> = ({
  users,
  token,
  user,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { success } = useSelector((state: AppState) => state.adminUserSlice);

  // const session = useSession();
  // const user = session.data?.user;

  // useEffect(() => {
  //   if (success && user?.isAdmin && user?.token) {
  //     dispatch(getUsers(user.token));
  //   }
  // }, [success]);
  return (
    <Fragment>
      <Head>
        <title>Stonkify | All Users</title>
      </Head>
      <Container>
        {users && token && <UserListScreen data={{ users, token, user }} />}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async (context) => {
    const session = await getSession({ req: context.req });
    const token = session?.accessToken as string;
    const users = await store.dispatch(getAllUsers.initiate(token));
    const user = session?.user;

    // console.log(users);

    if ("data" in users) {
      return {
        props: {
          users: users.data,
          token,
          user,
        },
      };
    }

    return {
      redirect: {
        pathname: "/",
        query: {
          error: "You are not authorized to view this page",
        },
      },
    };
  }
);

export default UserList;
