import Link from "next/link";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import Rating from "components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { AppState } from "store";
import { useRouter } from "next/router";

import Loader from "components/Loader";
import Message from "components/Message";

import { useGetProductQuery } from "services/productsApi";
import { IProduct } from "interfaces/products.interface";
import RequestError from "interfaces/requestError.interface";
import { useAddToCartMutation } from "services/cartApi";
import { addToCart, cartInit } from "reducers/cartSlice";
import { useSession } from "next-auth/react";
import { useAddReviewMutation } from "services/reviewApi";

const ProductScreen: FC<{
  id: string;
  currentProduct: IProduct;
}> = ({ id, currentProduct }) => {
  const product = currentProduct;
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(" ");
  const [reveiwStatus, setReviewStatus] = useState<boolean>(false);
  const [
    createReview,
    { isError: isCreateReviewError, error: createReviewError },
  ] = useAddReviewMutation();
  const {
    isLoading,
    isError,
    error,
    data: fetchedProduct,
    refetch,
  } = useGetProductQuery(product._id);
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const session = useSession();
  const token = session.data?.accessToken as string;

  const addToCartHandler = async () => {
    if (!token) {
      router.push("/login");
    } else {
      dispatch(
        addToCart({
          image: product.image,
          name: product.name,
          price: product.price,
          qty,
          productId: product._id,
        })
      );
    }
  };
  const addReviewHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (token && product?._id) {
      const reviewData = await createReview({
        review: { rating, comment, token, productId: product._id },
        productId: product._id,
        token,
      });
      if ("data" in reviewData) {
        refetch();
      }
    }
  };

  return (
    <>
      {product && (
        <>
          <Head>
            <title>{product.name}</title>
          </Head>
          <Container>
            <Link href="/">
              <button className="btn btn-light my-3">Go Back</button>
            </Link>
            {isLoading ? (
              <Loader />
            ) : isError ? (
              <Message varient={"danger"}>
                {(error as RequestError).data.message}
              </Message>
            ) : (
              <Fragment>
                <Row>
                  <Col md={6}>
                    <Image
                      fluid
                      src={`${process.env.BACKEND_URL}${product.image}`}
                      alt={product.name}
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h3>{product.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Rating
                          value={product.rating as number}
                          text={`${product.numReviews} ratings`}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                      <ListGroup.Item>
                        Description : {product.description}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={3}>
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>
                              <strong>{product.price}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Status : </Col>
                            <Col>
                              {product.countInStock && product.countInStock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock && product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty</Col>
                              <Col>
                                <Form.Control
                                  as="select"
                                  value={qty}
                                  onChange={(e) =>
                                    setQty(parseInt(e.target.value))
                                  }
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                          <Button
                            onClick={() => {
                              addToCartHandler();
                            }}
                            className="btn-block"
                            style={{ width: "100%" }}
                            type="button"
                            disabled={product.countInStock === 0}
                          >
                            Add to Cart
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews?.length === 0 && (
                      <Message>No Reviews</Message>
                    )}
                    {isCreateReviewError && (
                      <Alert variant="danger">
                        {(createReviewError as RequestError).data.message}
                      </Alert>
                    )}
                    {product.reviews && (
                      <ListGroup variant="flush">
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt?.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                          <h2>Write a Customer Review</h2>
                          {/* {reviewError && (
                            <Message varient="danger">{reviewError}</Message>
                          )} */}
                          {token ? (
                            <Form onSubmit={addReviewHandler}>
                              <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={rating}
                                  onChange={(e) =>
                                    setRating(Number(e.target.value))
                                  }
                                >
                                  <option value="">Select...</option>
                                  <option value="1">1 - Poor</option>
                                  <option value="2">2 - Fair</option>
                                  <option value="3">3 - Good</option>
                                  <option value="4">4 - Very Good</option>
                                  <option value="5">5 - Excellent</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Button type="submit" variant="primart">
                                Submit
                              </Button>
                            </Form>
                          ) : (
                            <Message>
                              Pleae <Link href="/login">Login</Link> to write a
                              reveiw
                            </Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    )}
                    {/* {!addToCartLoading && isSuccess && (
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Alert variant="success">
                            Product Added to the Cart !
                          </Alert>
                        </ListGroup.Item>
                      </ListGroup>
                    )} */}
                  </Col>
                </Row>
              </Fragment>
            )}
          </Container>{" "}
        </>
      )}
    </>
  );
};

type Params = {
  params: {
    id: string;
  };
};

export default ProductScreen;
