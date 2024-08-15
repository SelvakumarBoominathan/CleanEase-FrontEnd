//

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Body-styles.css";
import { getEmployeeData } from "../helper.js";
import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const isAdmin = username === "admin";
  const [workers, setWorkers] = useState([]); // State to store fetched workers
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedWorkers = await getEmployeeData();
        setWorkers(fetchedWorkers); // Set the workers state with the fetched data
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredWorkers = workers.filter((worker) => {
    if (service === "All" && cost === "All") {
      return true;
    }

    if (service === "All") {
      return parseInt(worker.price) <= cost;
    }

    if (cost === "All") {
      return worker.category === service;
    }

    return worker.category === service && worker.price <= cost;
  });

  return (
    <div className="container-body">
      <div className="grid-sys">
        {filteredWorkers.map((worker) => (
          <Card style={{ width: "18rem" }} key={worker.id}>
            <Card.Img variant="top" src={worker.image} alt="Worker" />
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
