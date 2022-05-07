import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";

const SearchBox = () => {
  const [keyword, setKeyword] = useState(" ");
  const router = useRouter();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (keyword.trim()) {
      router.push(`/search/query=${keyword}&page=1`);
    } else {
      router.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products...."
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
