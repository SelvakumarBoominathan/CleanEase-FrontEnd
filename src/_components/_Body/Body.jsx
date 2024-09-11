import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import "./Body-styles.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

// Import helper functions
import {
  getAllEmployee,
  deleteEmployee,
  addEmployee,
  updateEmp,
  addReviewandRating,
} from "../helper.js";

// Import modals from the Modals folder
import AddEmployeeModal from "./Modals/AddEmployeeModal";
import ReviewModal from "./Modals/ReviewModal";
import UpdateEmployeeModal from "./Modals/UpdateEmployeeModal";

const Body = ({ service, cost }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // useState to handle employee details
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // For Add modal visibility
  const [showUpdateModal, setUpdateShowModal] = useState(false); // For Update modal visibility
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewtext, setReviewText] = useState("");
  const [empID, setEmpId] = useState(null);
  const [empName, setEmpName] = useState(null);
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

  // Get all employee details
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter employees based on service and cost
  const filteredWorkers = employee.filter((employee) => {
    if (service === "All" && cost === "All") return true;
    if (service === "All")
      return parseInt(employee.price, 10) <= parseInt(cost, 10);
    if (cost === "All") return employee.category === service;
    return (
      employee.category === service &&
      parseInt(employee.price, 10) <= parseInt(cost, 10)
    );
  });

  // Handle deleting employee
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

  // Handle updating employee
  const handleUpdate = (empData) => {
    setUpdateEmployee(empData);
    setUpdateShowModal(true);
  };

  // Handle adding new employee
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

  // Handle submitting update for employee
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

  // Handle submitting review
  const handleReviewSubmit = async (rating, reviewtext, username, empID) => {
    try {
      await addReviewandRating(rating, reviewtext, username, empID);
      await fetchEmployees(); // Refetch the employee data to reflect the updates
      setRating(0);
      setReviewText("");
      setShowReviewModal(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleBookingClick = () => {
    navigate("/Bookingpage"); // Navigate to booking page
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
                aria-label="Star rating"
                className="justify-content-between"
              >
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(emp.rating.average);
                  const partialStar = emp.rating.average % 1;
                  let fillPercentage = 0;

                  if (i < fullStars) fillPercentage = 100;
                  else if (i === fullStars) fillPercentage = partialStar * 100;

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setEmpId(emp.id);
                        setEmpName(emp.name);
                        setShowReviewModal(true);
                      }}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: 30,
                        height: 30,
                      }}
                    >
                      <FaStar
                        size={30}
                        color="#e4e5e9"
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: 0,
                          top: 0,
                        }}
                      />
                      <FaStar
                        size={30}
                        color="#ffc107"
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: 0,
                          top: 0,
                          clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
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
                  <Button variant="primary" onClick={handleBookingClick}>
                    Book Now
                  </Button>
                )}
              </ButtonGroup>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <AddEmployeeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        handleAddEmployee={handleAddEmployee}
      />

      <UpdateEmployeeModal
        show={showUpdateModal}
        onHide={() => setUpdateShowModal(false)}
        updateEmployee={updateEmployee}
        setUpdateEmployee={setUpdateEmployee}
        handleUpdatesubmit={handleUpdatesubmit}
      />

      <ReviewModal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        empName={empName}
        rating={rating}
        setRating={setRating}
        hover={hover}
        setHover={setHover}
        reviewtext={reviewtext}
        setReviewText={setReviewText}
        handleReviewSubmit={handleReviewSubmit}
        empID={empID}
        username={username}
      />
    </div>
  );
};

export default Body;
