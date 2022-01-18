import Link from "next/link";
import { Carousel, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import { AppState } from "store";
import Loader from "./Loader";
import Message from "./Message";

const ProductsCarousel = () => {
  const { products, error, loading } = useSelector(
    (state: AppState) => state.topProducts
  );
  return loading ? (
    <Loader />
  ) : error ? (
    <Message varient="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link href={`/product/${product._id}`} passHref>
            <div className="carousel-content">
              <Image
                fluid
                src={`${process.env.BACKEND_URL}${product.image}`}
                alt={product.name}
              />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
