// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./categories-styles.css";

import React from "react";

const categories = () => {
  const Workers = [
    {
      image: "https://im.hunt.in/cg/Tirupur/City-Guide/house.jpg",
      category: "House Clean",
      name: "Lakshmi",
      city: "Chennai",
      id: 1,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Wash",
      sub_category: "House Cleaning",
      name: "Rajiv",
      city: "Chennai",
      id: 2,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Cloth Wash",
      name: "Perumal",
      city: "Thiruvallur",
      id: 3,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "House Clean",
      name: "Lakshmi",
      city: "Chennai",
      id: 4,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Bothroom Clean",
      name: "Revathi",
      city: "Thiruvallur",
      id: 5,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Garden Clean",
      name: "Muthu",
      city: "Chennai",
      id: 6,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Car Clean",
      name: "Muthu",
      city: "Chennai",
      id: 7,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Pet Clean",
      name: "Muthu",
      city: "Chennai",
      id: 8,
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Basement Clean",
      name: "Muthu",
      city: "Chennai",
      id: 9,
    },
  ];

  return (
    <div className="grid-sys">
      {/* <Row className="g-5"> */}
      {Workers.map((worker, id) => (
        // <Col key={id} sm>
        // {" "}
        <Card style={{ width: "18rem" }} key={id}>
          <Card.Img variant="top" src={worker.image} />
          <Card.Body>
            <Card.Title>Name: {worker.name}</Card.Title>
            <Card.Text>Name: {worker.name}</Card.Text>
            <Card.Text>Category: {worker.category}</Card.Text>
            <Card.Text>City: {worker.city}</Card.Text>
            <Button variant="primary">Book Now</Button>
          </Card.Body>
        </Card>
        // </Col>
      ))}
      {/* </Row> */}
    </div>
  );
};

export default categories;
