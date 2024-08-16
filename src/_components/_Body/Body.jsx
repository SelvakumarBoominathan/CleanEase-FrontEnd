import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Body-styles.css";
import { getAllEmployee } from "../helper.js";

import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = searchParams.get("user");
  const isAdmin = username === "admin" ? true : false;
  // console.log(service, cost);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getAllEmployee();
        setEmployees(employeeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredWorkers = employees.filter((employee) => {
    if (service === "All" && cost === "All") {
      return true;
    }

    if (service === "All") {
      return parseInt(employee.price) <= cost;
    }

    if (cost === "All") {
      return employee.category === service;
    }

    return employee.category === service && employee.price <= cost;
  });

  // console.log("Filtered Workers:", filteredWorkers);

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
