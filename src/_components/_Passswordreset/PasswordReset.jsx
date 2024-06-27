import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import "./Password-reset-styles.css";

const Password_reset = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send OTP to the entered email
    // Example: sendOtp(email);
    setShowAlert(true);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Enter Email</h1>
      <Row className="w-100 justify-content-center mt-3">
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <Button variant="primary" type="submit" className="w-30">
                Send OTP
              </Button>
            </div>
          </Form>
          {showAlert && (
            <Alert variant="success" className="mt-3">
              OTP has been sent to your email!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Password_reset;
