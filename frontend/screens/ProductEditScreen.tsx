import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { AppState } from "store";
import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import Message from "components/Message";
import {
  getCurrentProduct,
  updateProduct,
} from "reducers/asyncActions/productActions";
import { resetUpdateProductSucces } from "reducers/adminProductSlice";
import { resetproduct } from "reducers/createProductSlice";

const ProductEditScreen = () => {
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state: AppState) => state.user);
  const { success, error, loading, product } = useSelector(
    (state: AppState) => state.adminProductEdit
  );

  const queryArray = router.query.id as string[];

  const id = queryArray[0];

  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrentProduct(id));
    }
  }, [id]);

  useEffect(() => {
    if (success) {
      dispatch(resetUpdateProductSucces());
      router.push("/admin/productList");
    }
  }, [success]);
  useEffect(() => {
    if (product) {
      setPrice(product.price);
      setName(product.name);
      setBrand(product.brand);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updatedProduct = {
        name,
        brand,
        price,
        image,
        category,
        countInStock,
        description,
      };

      dispatch(
        updateProduct({
          product: updatedProduct,
          token: currentUser.token as string,
          productId: id,
        })
      );

      dispatch(resetproduct());
      dispatch(resetUpdateProductSucces());
    }
  };

  return (
    <>
      <Link href="/admin/productList" passHref>
        <a className="btn btn-light my-3">Go Back</a>
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient="danger">{error}</Message>
        ) : (
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
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
