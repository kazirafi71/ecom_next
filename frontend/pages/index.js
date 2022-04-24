import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";

export default function Home({ products }) {
  const router = useRouter();
  return (
    <Container>
      <Row>
        <h3 className="text-center py-3">All Products</h3>
        {products &&
          products?.map((item, index) => {
            return (
              <Col className="py-2" key={index} lg={3} md={4}>
                <Card style={{ height: "530px" }}>
                  <Card.Img
                    variant="top"
                    style={{ height: "250px", width: "100%" }}
                    src={item.image}
                  />
                  <Card.Body>
                    <Card.Title className="text-success">
                      {item.name.slice(0, 30)}
                    </Card.Title>
                    <h6>{item.price} Taka</h6>
                    <Card.Text style={{ height: "50px", fontSize: "14px" }}>
                      {item.description.slice(0, 80)}
                    </Card.Text>

                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <Button className="my-2" variant="primary">
                        Add To Cart
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/product/${item._id}`);
                        }}
                        className="my-2"
                        variant="outline-dark"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export async function getStaticProps(context) {
  const prod = await fetch(`${baseUrl}/api/all-products`);
  const data = await prod.json();
  return {
    props: {
      products: data.allProducts,
    },
    revalidate: 10,
  };
}
