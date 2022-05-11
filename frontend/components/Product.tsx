import Link from "next/link";
import { FC } from "react";
import { Card } from "react-bootstrap";

import { IProduct } from "interfaces/products.interface";
import Rating from "components/Rating";

const Product: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card className="my-3 p-3">
      <Link href={`/product/${product._id}`}>
        <a>
          <Card.Img
            src={`${process.env.BACKEND_URL}${product.image}`}
            variant="top"
          />
        </a>
      </Link>
      <Card.Body>
        <Link href={`/product/${product._id}`}>
          <a>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
        </Link>

        <Card.Title as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Title>

        <Card.Text as="h3">${product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
