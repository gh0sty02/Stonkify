import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import PlaceOrderScreen from "screens/PlaceOrderScreen";
import { AppState, wrapper } from "store";

const PlaceOrder = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { user } = useSelector((state: AppState) => state.auth);

  const { success, currentOrder: order } = useSelector(
    (state: AppState) => state.order
  );

  useEffect(() => {
    if (success && order) {
      router.push(`/orders/${order?._id}`);
    }
  }, [success, order]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | Order Summary</title>
      </Head>
      <Container>
        <PlaceOrderScreen />
      </Container>
      ;
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

export default PlaceOrder;
