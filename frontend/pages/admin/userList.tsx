import { FC, Fragment } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Container } from "react-bootstrap";

import IUser from "interfaces/user.interface";

import { wrapper } from "store";
import { getAllUsers } from "services/userApi";
import UserListScreen from "screens/UserListScreen";

const UserList: FC<{ users: IUser[]; user: Partial<IUser>; token: string }> = ({
  users,
  token,
  user,
}) => {
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
        destination: "/",
        permanent: false,
      },
    };
  }
);

export default UserList;
