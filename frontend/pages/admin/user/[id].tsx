import { FC, Fragment } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Container } from "react-bootstrap";

import IUser from "interfaces/user.interface";

import { makeStore, wrapper } from "store";
import { getUserById } from "services/userApi";
import UserEditScreen from "screens/UserEditScreen";

const UserEdit: FC<{ user: IUser; token: string; id: string }> = ({
  user,
  token,
  id,
}) => {
  return (
    <Fragment>
      <Head>
        <title>Stonkify | Edit User</title>
      </Head>
      <Container>
        {user && <UserEditScreen data={{ user, token, id }} />}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async (context) => {
    const store = makeStore();
    const id = context.query.id as string;
    const session = await getSession({ req: context.req });
    const token = session?.accessToken as string;
    const user = await store.dispatch(getUserById.initiate({ id, token }));
    if (token) {
      if ("data" in user) {
        return {
          props: {
            token,
            user: user.data,
            id,
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

export default UserEdit;
