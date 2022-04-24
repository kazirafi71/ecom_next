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
import Link from "next/link";
import baseUrl from "./../utils/baseUrl";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const formDataHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      email,
      password,
    };
    try {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setLoading(false);
      console.log("result", result);
      if (result.error) {
        setSuccess("");
        return setErrorMsg(result.error);
      } else {
        setErrorMsg("");
        setSuccess(result.success);
        Cookies.set("auth_token", result.token);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col className="mx-auto" md={8}>
            <Card className="p-4">
              <h2 className="text-center py-3">Login Here</h2>
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={formDataHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <p>
                  {` Don't have an account?`}
                  <Link href="/signup">Registration</Link>
                </p>
                <Button type="submit" variant="outline-dark">
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
