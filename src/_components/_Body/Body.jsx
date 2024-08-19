import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Body-styles.css";
import {
  getAllEmployee,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from "../helper.js"; // Import addEmployee function
import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [showUpdateModal, setUpdateShowModal] = useState(false); // For modal visibility
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
        
        const employeeToUpdate = employeeData.find(emp => emp.id === )



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

  const handleUpdate = async (empData) => {
    try {
      // const EmployeeData = employee.filter((emp) => emp.id === empData.id);
      setUpdateEmployee(empData)
      setUpdateShowModal(true);
      // await updateEmployee(id);

      alert("Employee Updated successfully");
    } catch (error) {
      alert("Failed to update employee");
      console.error("Error updating employee:", error);
    }
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
            <Card.Body>
              <Card.Title>Name: {emp.name}</Card.Title>
              <Card.Text>Category: {emp.category}</Card.Text>
              <Card.Text>City: {emp.city}</Card.Text>
              <Card.Text>Price: {emp.price} INR</Card.Text>
              {isAdmin ? (
                <>
                  <Button
                    variant="secondary"
                    className="mx-4"
                    onClick={() => handleUpdate(emp)}
                  >
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>
                </>
              ) : (
                <Button variant="primary">Book Now</Button>
              )}
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
    </div>
  );
};

export default Body;
