import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "components/CartItem";
import Message from "components/Message";
import { addToCart } from "reducers/asyncActions/cartActions";
import { removeItem } from "reducers/cartSlice";

import { AppState, wrapper } from "store";

const CartScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems, error, loading } = useSelector(
    (state: AppState) => state.cart
  );

  const dispatchChangeQty = (id: string, qty: number) => {
    dispatch(addToCart({ id, qty }));
  };

  const checkOutHandler = () => {
    router.push("/login?redirect=shipping", undefined, { shallow: true });
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeItem(id));
  };
  return (
    <>
      <Head>
        <title>Stonkify</title>
      </Head>
      <Container>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is Empty <Link href="/">Go Back</Link>{" "}
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <CartItem
                    item={item}
                    onRemoveFromCardHandler={removeFromCartHandler}
                    onChangeQty={dispatchChangeQty}
                    key={item._id}
                  />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce(
                      (acc, item) => acc + (item!.qty as number),
                      0
                    )}
                    ) items
                  </h2>
                  $
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + (item!.qty as number) * (item!.price as number),
                      0
                    )
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    style={{ width: "100%" }}
                    disabled={cartItems.length == 0}
                    onClick={() => checkOutHandler()}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      );
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      return {
        props: {},
      };
    }
);

export default CartScreen;
