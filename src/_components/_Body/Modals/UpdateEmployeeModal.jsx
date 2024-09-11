import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const UpdateEmployeeModal = ({
  show,
  onHide,
  updateEmployee,
  setUpdateEmployee,
  handleUpdatesubmit,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
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
                setUpdateEmployee({ ...updateEmployee, image: e.target.value })
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
                setUpdateEmployee({ ...updateEmployee, price: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdatesubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeModal;
