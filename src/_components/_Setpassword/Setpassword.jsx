import "./Setpassword-styles.css";
import React, { useState } from "react";
import { Container, Form, Button, Row, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { passwordvalidate } from "../validate.js";

const Setpassword = () => {
  const [newpassword, setNewpassword] = useState("");
  const [reenterpassword, setReenterpassword] = useState("");
  const [showToast, setshowToast] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    const errors = await passwordvalidate({ password: newpassword });

    if (errors !== "Password is strong") {
      setValidationError(errors);
      return;
    }

    if (newpassword !== reenterpassword) {
      setValidationError("Passwords do not match");
      return;
    }

    // Reset validation error
    setValidationError("");

    // Logic to send OTP to the entered email
    // Example: sendOtp(email);
    setshowToast(true);

    console.log({ newpassword: newpassword, reenterpassword: reenterpassword });

    // settimeout to redirect to loginpage automatically
    setTimeout(() => {
      navigate("/Login");
    }, 3000);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Enter New Password</h1>

      <Form onSubmit={handleSubmit} className="Form-Register shadow">
        <Row className="mb-1 mx-5 d-grid align-items-center">
          <Form.Group controlId="formBasicEmail" className="col-md-12">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail2">
            <Form.Label>Re-enter new password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              value={reenterpassword}
              onChange={(e) => setReenterpassword(e.target.value)}
              required
            />
          </Form.Group>
          {validationError && (
            <div className="text-danger">{validationError}</div>
          )}
          <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <Button variant="primary" type="submit" className="w-30 px-3 py-2">
              Reset
            </Button>
          </div>
        </Row>
      </Form>
      <Toast
        onClose={() => setshowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="position-fixed top-0 center-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>Password reset has been done!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Setpassword;
