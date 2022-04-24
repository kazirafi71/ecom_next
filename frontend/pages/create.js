import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { auth_token } = parseCookies();

  const productFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("productImg", image);
    formData.append("price", price);
    formData.append("quantity", quantity);

    Axios.post(`${baseUrl}/api/add-product`, formData, {
      headers: {
        Authorization: "Bearer " + auth_token,
      },
    })
      .then((result) => {
        console.log(result.data);
        toast.success(`${result.data.success}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/");
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="mx-auto mt-5" md={8}>
            <Card className="p-4">
              <h3 className="text-center pb-3">Add Product</h3>
              {errorMsg && <Alert>{errorMsg.error}</Alert>}

              <Form onSubmit={productFormHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Product name"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Product Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Product image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Create;
