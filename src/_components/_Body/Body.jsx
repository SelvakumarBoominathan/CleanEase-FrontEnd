import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaStar } from "react-icons/fa";
import "./Body-styles.css";
import {
  getAllEmployee,
  deleteEmployee,
  addEmployee,
  updateEmp,
  addReviewandRating,
} from "../helper.js"; // Import addEmployee and updateEmployee functions
import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();

  //useState to handle all employee details
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // For Add modal visibility
  const [showUpdateModal, setUpdateShowModal] = useState(false); // For Update modal visibility
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewtext, setReviewText] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    image: "",
    category: "",
    name: "",
    city: "",
    id: "",
    price: "",
    rating: { average: 0, count: 0 },
  });
  const [updateEmployee, setUpdateEmployee] = useState({
    image: "",
    category: "",
    name: "",
    city: "",
    id: "",
    price: "",
  });
  const username = searchParams.get("user");
  const isAdmin = username === "admin";

  //get all employee details
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getAllEmployee();
        setEmployee(employeeData);
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

  const filteredWorkers = employee.filter((employee) => {
    if (service === "All" && cost === "All") {
      return true;
    }

    if (service === "All") {
      return parseInt(employee.price, 10) <= parseInt(cost, 10);
    }

    if (cost === "All") {
      return employee.category === service;
    }

    return (
      employee.category === service &&
      parseInt(employee.price, 10) <= parseInt(cost, 10)
    );
  });

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployee(employee.filter((emp) => emp.id !== id));
      alert("Employee deleted successfully");
    } catch (error) {
      alert("Failed to delete employee");
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdate = (empData) => {
    setUpdateEmployee(empData);
    setUpdateShowModal(true);
  };

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee);
      setEmployee([...employee, newEmployee]);
      setShowModal(false);
      setNewEmployee({
        image: "",
        category: "",
        name: "",
        city: "",
        id: "",
        price: "",
        rating: { average: 0, count: 0 },
      });
      alert("Employee added successfully");
    } catch (error) {
      alert("Failed to add employee");
      console.error("Error adding employee:", error);
    }
  };

  const handleUpdatesubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmp(updateEmployee.id, updateEmployee);
      setEmployee(
        employee.map((emp) =>
          emp.id === updateEmployee.id ? updateEmployee : emp
        )
      );
      setUpdateShowModal(false);
      alert("Employee updated successfully");
    } catch (error) {
      alert("Failed to update employee");
      console.error("Error updating employee:", error);
    }
  };

  const handleReviewSubmit = (rating, reviewtext, username) => {
    console.log("Rating:", rating);
    console.log("Review:", reviewtext);
    console.log("unsername:", username);
    addReviewandRating(rating, reviewtext, username);
    setShowReviewModal(false);
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="container-body overflow-scroll">
      {isAdmin && (
        <Button
          variant="primary"
          className="d-flex justify-content-center mx-auto mt-3 mb-3"
          onClick={() => setShowModal(true)}
        >
          Add New Employee
        </Button>
      )}
      <div className="grid-sys">
        {filteredWorkers.map((emp) => (
          <Card style={{ width: "18rem" }} key={emp.id}>
            <Card.Img variant="top" src={emp.image} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Name: {emp.name}</Card.Title>
              <Card.Text>Category: {emp.category}</Card.Text>
              <Card.Text>City: {emp.city}</Card.Text>
              <Card.Text>Price: {emp.price} INR</Card.Text>
              <ButtonGroup
                area-label="Star rating"
                className="justify-content-between"
              >
                {[...Array(5)].map((_, i) => {
                  // Calculate the current star's fill percentage
                  const fullStars = Math.floor(emp.rating.average); // Number of fully filled stars
                  const partialStar = emp.rating.average % 1; // Fractional part of the rating

                  let fillPercentage = 0;

                  if (i < fullStars) {
                    fillPercentage = 100; // Fully filled star
                  } else if (i === fullStars) {
                    fillPercentage = partialStar * 100; // Partially filled star
                  }

                  return (
                    <div
                      key={i}
                      onClick={() => setShowReviewModal(true)}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: 30, // Make sure the container has the same width as the star
                        height: 30,
                      }}
                    >
                      <FaStar
                        size={30}
                        color="#e4e5e9" // Base color for unfilled star
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: 0,
                          top: 0,
                        }}
                      />
                      <FaStar
                        size={30}
                        color="#ffc107" // Filled color
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: 0,
                          top: 0,
                          clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`, // This clips the star based on the fill percentage
                        }}
                      />
                    </div>
                  );
                })}
                <p className="pt-1">{`${emp.rating.count} ratings`}</p>
              </ButtonGroup>
              <ButtonGroup className="mt-4 w-50">
                {isAdmin ? (
                  <>
                    <Button
                      variant="secondary"
                      className="mx-4 h-25 rounded"
                      onClick={() => handleUpdate(emp)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      className="rounded"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button variant="primary">Book Now</Button>
                )}
              </ButtonGroup>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for Adding Employee */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newEmployee.image}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, image: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newEmployee.category}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={newEmployee.city}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, city: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ID"
                value={newEmployee.id}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, id: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newEmployee.price}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, price: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Update Employee */}
      <Modal show={showUpdateModal} onHide={() => setUpdateShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={updateEmployee.image}
                onChange={(e) =>
                  setUpdateEmployee({
                    ...updateEmployee,
                    image: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={updateEmployee.category}
                onChange={(e) =>
                  setUpdateEmployee({
                    ...updateEmployee,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={updateEmployee.name}
                onChange={(e) =>
                  setUpdateEmployee({ ...updateEmployee, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={updateEmployee.city}
                onChange={(e) =>
                  setUpdateEmployee({ ...updateEmployee, city: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ID"
                value={updateEmployee.id}
                onChange={(e) =>
                  setUpdateEmployee({ ...updateEmployee, id: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={updateEmployee.price}
                onChange={(e) =>
                  setUpdateEmployee({
                    ...updateEmployee,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUpdateShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdatesubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Modal for add review */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{`Rate ${employee.name}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;

                return (
                  <Form.Label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={{ display: "none" }}
                    />
                    <FaStar
                      size={30}
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      style={{ cursor: "pointer", transition: "color 200ms" }}
                    />
                  </Form.Label>
                );
              })}
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Provide review: </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewtext}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleReviewSubmit(rating, reviewtext, username)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Body;
