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

  const handleDetete = (id)=>{
    
  }

  // console.log("Filtered Workers:", filteredWorkers);

  return (
    <div className="container-body">
      <div className="grid-sys">
        {filteredWorkers.map((emp) => (
          <Card style={{ width: "18rem" }} key={emp.id}>
            <Card.Img variant="top" src={emp.image} />
            <Card.Body>
              <Card.Title>Name: {emp.name}</Card.Title>

              <Card.Text>Category: {emp.category}</Card.Text>
              <Card.Text>City: {emp.city}</Card.Text>
              <Card.Text>Price: {emp.price} INR</Card.Text>
              {isAdmin ? (
                <Button variant="primary" onClick={() => handleDetete(emp.id)}>
                  Delete
                </Button>
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
