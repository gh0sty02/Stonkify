import Head from "next/head";
import { Fragment } from "react";
import { Container } from "react-bootstrap";

import UserEditScreen from "screens/UserEditScreen";

const UserEdit = () => {
  return (
    <Fragment>
      <Head>
        <title>Stonkify | Edit User</title>
      </Head>
      <Container>
        <UserEditScreen />
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

export default UserEdit;
