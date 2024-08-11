import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Body-styles.css";
import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const isAdmin = username === "admin" ? true : false;
  console.log(service, cost);

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
      category: "Plumber",
      name: "Raj kumar",
      city: "Chennai",
      id: 7,
      price: "400",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Plumber",
      name: "Raj kumar",
      city: "Chennai",
      id: 8,
      price: "200",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "AC service",
      name: "Vignesh",
      city: "Chennai",
      id: 9,
      price: "200",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Pet Clean",
      name: "Muthukumar",
      city: "Chennai",
      id: 10,
      price: "300",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Washer",
      name: "Latha",
      city: "Chennai",
      id: 11,
      price: "600",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Washer",
      name: "Kayal",
      city: "Chennai",
      id: 12,
      price: "600",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Washer",
      name: "Latha",
      city: "Chennai",
      id: 13,
      price: "600",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/middle-age-man-beard-smiling-260nw-1917255131.jpg",
      category: "Vessel Washer",
      name: "Latha",
      city: "Chennai",
      id: 14,
      price: "600",
    },
  ];
  const filteredWorkers = Workers.filter((worker) => {
    const maxCost = cost !== "All" ? parseInt(cost, 10) : null;

    // If cost is "All", ignore cost filtering, otherwise filter by cost and service
    return (
      (worker.category === service && maxCost === null) ||
      parseInt(worker.price, 10) <= maxCost
    );
  });

  console.log("Filtered Workers:", filteredWorkers);

  return (
    <div className="container-body">
      <div className="grid-sys">
        {filteredWorkers.map((worker) => (
          <Card style={{ width: "18rem" }} key={worker.id}>
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
        ))}
      </div>
    </div>
  );
};

export default Body;

//
