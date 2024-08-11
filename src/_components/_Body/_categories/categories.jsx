// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./categories-styles.css";
import { useSearchParams } from "react-router-dom";

import React from "react";

const categories = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const isAdmin = username === "admin" ? true : false;

  const Workers = [
    {
      image: "https://im.hunt.in/cg/Tirupur/City-Guide/house.jpg",
      category: "House Cleaner",
      name: "Lakshmi",
      city: "Chennai",
      id: 1,
      price: "300",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Wash",
      sub_category: "Car Cleaner",
      name: "Rajiv",
      city: "Chennai",
      id: 2,
      price: "600",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Kitchen Cleaner",
      name: "Electrition",
      city: "Thiruvallur",
      id: 3,
      price: "300",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "House Clean",
      name: "Lakshmi",
      city: "Chennai",
      id: 4,
      price: "600",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Gardener",
      name: "Revathi",
      city: "Thiruvallur",
      id: 5,
      price: "700",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Plumber",
      name: "Raj kumar",
      city: "Chennai",
      id: 6,
      price: "400",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "AC service",
      name: "Vignesh",
      city: "Chennai",
      id: 7,
      price: "200",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Pet Clean",
      name: "Muthukumar",
      city: "Chennai",
      id: 8,
      price: "300",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Washer",
      name: "Latha",
      city: "Chennai",
      id: 9,
      price: "600",
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

            <Card.Text>Category: {worker.category}</Card.Text>
            <Card.Text>City: {worker.city}</Card.Text>
            <Card.Text>Price: {worker.price} INR</Card.Text>
            {isAdmin ? (
              <Button variant="primary">Delete</Button>
            ) : (
              <Button variant="primary">Book Now</Button>
            )}
          </Card.Body>
        </Card>
        // </Col>
      ))}
      {/* </Row> */}
    </div>
  );
};

export default categories;
