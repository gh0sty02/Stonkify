import { IProduct } from "interfaces/products.interface";
import RequestError from "interfaces/requestError.interface";
import Link from "next/link";
import { FC } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetTopRatedProductsQuery } from "services/productsApi";

import { AppState } from "store";
import Loader from "./Loader";
import Message from "./Message";

const ProductsCarousel: FC<{ topProducts: IProduct[] }> = ({ topProducts }) => {
  return (
    <Carousel pause="hover" className="bg-dark">
      {topProducts &&
        topProducts.map((product) => (
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
  // );
};

export default ProductsCarousel;
