import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AddEmployeeModal = ({
  show,
  onHide,
  newEmployee,
  setNewEmployee,
  handleAddEmployee,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
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
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddEmployee}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;
