import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";

import FormContainer from "components/FormContainer";
import Loader from "components/Loader";

import { IProduct } from "interfaces/products.interface";
import { useUpdateProductMutation } from "services/productsApi";

interface IProps {
  data: {
    token: string;
    product: IProduct;
    productId: string;
    isAdmin: boolean;
  };
}

const ProductEditScreen: FC<IProps> = ({
  data: { token, product, productId, isAdmin },
}) => {
  const router = useRouter();
  const [price, setPrice] = useState<number>(product.price);
  const [name, setName] = useState<string>(product.name);
  const [image, setImage] = useState<string>(product.image);
  const [brand, setBrand] = useState<string>(product.brand);
  const [category, setCategory] = useState<string>(product.category);
  const [countInStock, setCountInStock] = useState<number>(
    product.countInStock
  );
  const [description, setDescription] = useState<string>(product.description);
  const [uploading, setUploading] = useState<boolean>(false);
  const [updateProduct, { isLoading, isSuccess, error }] =
    useUpdateProductMutation();

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data }: { data: string } = await axios.post(
          `${process.env.BACKEND_URL}/api/upload`,
          formData,
          config
        );

        setImage(data);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      brand,
      price,
      image,
      category,
      countInStock,
      description,
    };
    if (token && isAdmin) {
      const data = await updateProduct({
        product: updatedProduct,
        productId: product._id,
        token,
      });
      if ("data" in data) {
        router.push(`${process.env.BASE_URL}/admin/productList/1`);
      }
    }
  };

  return (
    <>
      <Link href="/admin/productList" passHref>
        <a className="btn btn-light my-3">Go Back</a>
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-3"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Price"
              value={price}
              className="mb-3"
              required
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image Url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mb-3"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Select a Image</Form.Label>
            <Form.Control
              type="file"
              id="image-file"
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mb-3"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Set Count In Stock "
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
              className="mb-3"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mb-3"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="escription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description Url"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-3"
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            {" "}
            Update
          </Button>
        </Form>
        {/* )} */}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
