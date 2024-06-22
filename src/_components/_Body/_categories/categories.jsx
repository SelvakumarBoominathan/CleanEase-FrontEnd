import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import React from "react";

const categories = () => {
  const Workers = [
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "House Clean",
      name: "Lakshmi",
      city: "Chennai",
    },
    {
      category: "Vessel Wash",
      sub_category: "House Cleaning",
      name: "Rajiv",
      city: "Chennai",
    },
    {
      category: "Cloth Wash",
      name: "Perumal",
      city: "Thiruvallur",
    },
    {
      category: "House Clean",
      name: "Lakshmi",
      city: "Chennai",
    },
    {
      category: "Bothroom Clean",
      name: "Revathi",
      city: "Thiruvallur",
    },
    {
      category: "Garden Clean",
      name: "Muthu",
      city: "Chennai",
    },
    {
      category: "Car Clean",
      name: "Muthu",
      city: "Chennai",
    },
    {
      category: "Pet Clean",
      name: "Muthu",
      city: "Chennai",
    },
    {
      category: "Basement Clean",
      name: "Muthu",
      city: "Chennai",
    },
  ];

  return (
    <Container>
      <Row>
        {Workers.map((worker) => (
          <Col sm>
            {" "}
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={worker.image} />
              <Card.Body>
                <Card.Title>{worker.name}</Card.Title>
                <Card.Text>{worker.category}</Card.Text>
                <Card.Text>{worker.city}</Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default categories;
