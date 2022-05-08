import Link from "next/link";
import { Col, Row, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";

import Loader from "components/Loader";
import Message from "components/Message";
import { AppState } from "store";
import Paginate from "src/components/Paginate";
import { IProduct } from "interfaces/products.interface";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "services/productsApi";

interface IProps {
  data: {
    products: IProduct[];
    page: number;
    token: string;
    isAdmin: boolean;
    pages: number;
  };
}

const ProductListScreen: FC<IProps> = ({
  data: { products, page, pages, token, isAdmin },
}) => {
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();
  const { refetch } = useGetAllProductsQuery({ pageNumber: 1, keyword: "" });

  const deleteHandler = async (productId: string, token: string) => {
    if (token && isAdmin) {
      const data = await deleteProduct({ productId: productId, token: token });
      if ("data" in data) {
        refetch();
      }
    }
  };

  return (
    <>
      {products && token && isAdmin && (
        <>
          <Row className="align-items-center">
            <Col md={10}>
              <h1>Products</h1>
            </Col>
          </Row>
          <Fragment>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>Action</th>
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
                      <Link href={`/admin/product/edit/${product._id}`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id, token)}
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
          {/* )} */}
        </>
      )}
    </>
  );
};
export default ProductListScreen;
