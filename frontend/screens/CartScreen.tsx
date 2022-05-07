import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, ListGroup, Row, Button, Card } from "react-bootstrap";
import { useSession } from "next-auth/react";

import { AppState } from "store";
import CartItem from "components/CartItem";
import Message from "components/Message";
import { changeQty, removeFromCart } from "reducers/cartSlice";
import { useGetAllCartItemsMutation } from "services/cartApi";
import Loader from "src/components/Loader";

const CartScreen = () => {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state: AppState) => state.cart);

  const dispatchChangeQty = async (productId: string, qty: number) => {
    dispatch(changeQty({ productId, qty }));
  };

  const checkOutHandler = () => {
    router.push("/login?redirect=shipping", undefined, { shallow: true });
  };

  const removeFromCartHandler = async (productId: string) => {
    dispatch(removeFromCart(productId));
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
            {loading && <Loader />}
            {cartItems.length !== 0 ? (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <CartItem
                    data={{
                      item: item,
                      onRemoveFromCardHandler: removeFromCartHandler,
                      onChangeQty: dispatchChangeQty,
                    }}
                    key={item.productId}
                  />
                ))}
              </ListGroup>
            ) : loading ? (
              <Loader />
            ) : (
              <Message>
                Your Cart is Empty <Link href="/">Go Back</Link>{" "}
              </Message>
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
    </>
  );
};

export default CartScreen;
