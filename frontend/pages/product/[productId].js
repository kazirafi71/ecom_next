import React from "react";
import { useRouter } from "next/router";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import baseUrl from "../../utils/baseUrl";

const ProductDetails = ({ prodDetails }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <>Loading..</>;
  }
  return (
    <div>
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="p-3">
              <Image src={prodDetails.image} width={1000} height={550} />
              <h4>{prodDetails.price}Taka</h4>
              <h6>Quantity :</h6>
              <form action="">
                <input
                  type="number"
                  name="quantity"
                  id=""
                  min="1"
                  max={prodDetails.quantity}
                  placeholder="Quantity"
                />
              </form>
              <Button className="my-2" variant="primary">
                Add To Cart
              </Button>
              <h4>{prodDetails.name}</h4>
              <p>{prodDetails.description}</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export async function getStaticProps(context) {
  const { productId } = context.params;

  const res = await fetch(`${baseUrl}/api/products/${productId}`);
  const data = await res.json();

  return {
    props: { prodDetails: data }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/api/all-products`);
  const prod = await res.json();

  const paths = prod.allProducts.map((item) => ({
    params: { productId: item._id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default ProductDetails;
