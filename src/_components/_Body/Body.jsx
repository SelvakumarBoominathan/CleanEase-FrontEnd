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
} from "../helper.js"; // Import addEmployee and updateEmployee functions
import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // For Add modal visibility
  const [showUpdateModal, setUpdateShowModal] = useState(false); // For Update modal visibility
  const [showReviewModal, setShowReviewModal] = useState(true);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    image: "",
    category: "",
    name: "",
    city: "",
    id: "",
    price: "",
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
                  const ratingValue = i + 1;
                  return (
                    <div
                      key={i}
                      variant={null}
                      onClick={() => setShowReviewModal(true)}
                      style={{ padding: 0 }}
                    >
                      <FaStar
                        size={30}
                        color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  );
                })}
                <p className="pt-1 ">12 ratings</p>
              </ButtonGroup>
              <ButtonGroup className="mt-4 w-50">
                {isAdmin ? (
                  <>
                    <Button
                      variant="secondary"
                      className="mx-4 w-25"
                      onClick={() => handleUpdate(emp)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
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
          <Modal.Title>Rate {employee.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;

              return (
                <label key={i}>
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
                </label>
              );
            })}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={null}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Body;
