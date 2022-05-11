import Head from "next/head";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

import PaymentScreen from "screens/PaymentMethodScreen";
import { wrapper } from "store";

const PaymentMethod = () => {
  return (
    <Fragment>
      <Head>
        <title>Stonkify | Payment Method</title>
      </Head>
      <div>
        <PaymentScreen />
      </div>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      return {
        props: {},
      };
    }
);

export default PaymentMethod;
