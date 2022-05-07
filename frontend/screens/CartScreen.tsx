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
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "components/CartItem";
import Message from "components/Message";
import { addToCart } from "reducers/asyncActions/cartActions";
import { cartInit, changeQty, removeFromCart } from "reducers/cartSlice";

import { AppState, wrapper } from "store";
import {
  useAddToCartMutation,
  useChangeQtyMutation,
  useGetAllCartItemsMutation,
  useRemoveFromCartMutation,
} from "services/cartApi";
import { FC, useEffect, useState } from "react";
import { ICartItem } from "interfaces/cart.interface";
import Loader from "src/components/Loader";
import { useSession } from "next-auth/react";

const CartScreen = () => {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state: AppState) => state.cart);
  const [getAllCartItems] = useGetAllCartItemsMutation();
  // const [changeQty] = useChangeQtyMutation();
  // const [removeFromCart] = useRemoveFromCartMutation();
  const token = session.data?.accessToken as string;

  // useEffect(() => {
  //   if (token) {
  //     setLoading(true);
  //     getCartItems(token).then((data) => {
  //       dispatch(cartInit(data));
  //     });
  //     setLoading(false);
  //   }
  // }, [token]);

  const getCartItems = async (token: string) => {
    const res = await getAllCartItems(token);
    if ("data" in res) {
      return res.data;
    }
    return [];
  };

  const dispatchChangeQty = async (productId: string, qty: number) => {
    dispatch(changeQty({ productId, qty }));
  };

  const checkOutHandler = () => {
    router.push("/login?redirect=shipping", undefined, { shallow: true });
  };

  const removeFromCartHandler = async (productId: string) => {
    // const result = await removeFromCart({ cartItemId: id, token });
    // if ("data" in result) {
    //   dispatch(cartInit(result.data));
    // }
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
                    item={item}
                    onRemoveFromCardHandler={removeFromCartHandler}
                    onChangeQty={dispatchChangeQty}
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
