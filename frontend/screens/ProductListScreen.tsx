import Link from "next/link";
import { Col, Row, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Fragment } from "react";

import Loader from "components/Loader";
import Message from "components/Message";
import { AppState } from "store";
import {
  createProduct,
  deleteProduct,
} from "reducers/asyncActions/productActions";
import Paginate from "src/components/Paginate";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading, error, pages, page } = useSelector(
    (state: AppState) => state.productList
  );
  const { user: currentUser } = useSelector((state: AppState) => state.user);
  const { loading: createProductLoading, error: createProductError } =
    useSelector((state: AppState) => state.adminProductEdit);

  type data = {
    productId: string;
    token: string;
  };

  const deleteHandler = (data: data) => {
    if (currentUser) {
      dispatch(deleteProduct({ productId: data.productId, token: data.token }));
    }
  };
  const createProductHandler = () => {
    if (currentUser && currentUser.token) {
      dispatch(createProduct(currentUser.token));
    }
  };

  return (
    <>
      {products && currentUser?.token && currentUser?.isAdmin && (
        <>
          <Row className="align-items-center">
            <Col md={10}>
              <h1>Products</h1>
            </Col>
            <Col md={2} className=" text-right">
              <Button className="my-3" onClick={createProductHandler}>
                Create Product <i className="fas fa-plus"></i>
              </Button>
            </Col>
          </Row>
          {loading || (createProductLoading && <Loader />)}
          {error && <Message varient="danger">{error}</Message>}

          {createProductError && (
            <Message varient="danger">{createProductError}</Message>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message varient="danger">{error}</Message>
          ) : (
            <Fragment>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Link href={`/admin/product/${product._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() =>
                            deleteHandler({
                              productId: product._id,
                              token: currentUser.token as string,
                            })
                          }
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </Fragment>
          )}
        </>
      )}
    </>
  );
};
export default ProductListScreen;
