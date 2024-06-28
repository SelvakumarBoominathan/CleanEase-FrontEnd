import "./Setpassword-styles.css";
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Setpassword = () => {
  const [email, setEmail] = useState("");
  const [showToast, setshowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send OTP to the entered email
    // Example: sendOtp(email);
    setshowToast(true);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Enter New Password</h1>
      <Row className="w-100 justify-content-center mt-3">
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Enter new password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Re-enter new password </Form.Label>
              <Form.Control
                type="text"
                // placeholder="Confirm New Password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <Button variant="primary" type="submit" className="w-30">
                Reset Password
              </Button>
            </div>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Setpassword;
