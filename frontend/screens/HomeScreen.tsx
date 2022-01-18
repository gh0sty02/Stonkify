import { FC } from "react";
import { Col, Row } from "react-bootstrap";

import { IProduct } from "interfaces/products.interface";
import Product from "components/Product";
import Paginate from "src/components/Paginate";
import { useSelector } from "react-redux";
import { AppState } from "store";
import ProductsCarousel from "src/components/ProductsCarousel";

const HomeScreen: FC<{ products: IProduct[]; keyword: string }> = ({
  products,
  keyword,
}) => {
  const { page, pages } = useSelector((state: AppState) => state.productList);
  return (
    <>
      {!keyword && <ProductsCarousel />}
      <h1 className="mt-3">Latest Products</h1>
      <Row>
        {products.map((prod: IProduct) => (
          <Col key={prod._id} sm={12} md={4} xl={3}>
            <Product product={prod} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page}></Paginate>
    </>
  );
};

export default HomeScreen;
