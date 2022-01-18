import { FC } from "react";
import { Row, Col } from "react-bootstrap";

import { IProduct } from "interfaces/products.interface";
import Message from "./Message";
import Product from "./Product";

const ListProducts: FC<{ products: IProduct[]; loading: boolean }> = ({
  products,
  loading,
}) => {
  return (
    <Row>
      {products.map((prod: IProduct) => (
        <Col key={prod._id} sm={12} md={4} xl={3}>
          <Product product={prod} />
        </Col>
      ))}
      {products.length === 0 && !loading && (
        <Message>No Products Found</Message>
      )}
    </Row>
  );
};

export default ListProducts;
