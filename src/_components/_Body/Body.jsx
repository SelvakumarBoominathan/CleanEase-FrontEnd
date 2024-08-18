// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import "./Body-styles.css";
// import { getAllEmployee, deleteEmployee } from "../helper.js";

// import { useSearchParams } from "react-router-dom";

// const Body = ({ service, cost }) => {
//   const [searchParams] = useSearchParams();
//   const [employees, setEmployees] = useState();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const username = searchParams.get("user");
//   const isAdmin = username === "admin" ? true : false;
//   // console.log(service, cost);
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const employeeData = await getAllEmployee();
//         setEmployees(employeeData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const filteredWorkers = employees.filter((employee) => {
//     if (service === "All" && cost === "All") {
//       return true;
//     }

//     if (service === "All") {
//       return parseInt(employee.price) <= cost;
//     }

//     if (cost === "All") {
//       return employee.category === service;
//     }

//     return employee.category === service && employee.price <= cost;
//   });

//   const handleDelete = async (id) => {
//     try {
//       await deleteEmployee(id);
//       setEmployees(employees.filter((employee) => employee.id !== id));
//       alert("Employee deleted successfully");
//       // Optionally, refresh the employee list or update state
//     } catch (error) {
//       alert("Failed to delete employee");
//       console.error("Error deleting employee:", error);
//     }
//   };

//   // console.log("Filtered Workers:", filteredWorkers);

//   return (
//     <div className="container-body">
//       <div className="grid-sys">
//         {filteredWorkers.map((emp) => (
//           <Card style={{ width: "18rem" }} key={emp.id}>
//             <Card.Img variant="top" src={emp.image} />
//             <Card.Body>
//               <Card.Title>Name: {emp.name}</Card.Title>

//               <Card.Text>Category: {emp.category}</Card.Text>
//               <Card.Text>City: {emp.city}</Card.Text>
//               <Card.Text>Price: {emp.price} INR</Card.Text>
//               {isAdmin ? (
//                 <Button variant="primary" onClick={() => handleDelete(emp.id)}>
//                   Delete
//                 </Button>
//               ) : (
//                 <Button variant="primary">Book Now</Button>
//               )}
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Body;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Body-styles.css";
import { getAllEmployee, deleteEmployee, addEmployee } from "../helper.js"; // Import addEmployee function
import { useSearchParams } from "react-router-dom";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [newEmployee, setNewEmployee] = useState({
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
      setEmployees(employees.filter((employee) => employee.id !== id));
      alert("Employee deleted successfully");
    } catch (error) {
      alert("Failed to delete employee");
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee);
      setEmployees([...employees, newEmployee]);
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
    <div className="container-body">
      {isAdmin && (
        <Button variant="primary" onClick={() => setShowModal(true)}>
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
                <Button variant="danger" onClick={() => handleDelete(emp.id)}>
                  Delete
                </Button>
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
    </div>
  );
};

export default Body;
