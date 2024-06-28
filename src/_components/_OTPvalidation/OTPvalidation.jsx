import "./OTPvalidation-styles.css";
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OTPvalidation = () => {
  const [email, setEmail] = useState("");
  const [showToast, setshowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send OTP to the entered email
    // Example: sendOtp(email);
    setshowToast(true);
    //to navigate to another component
    setTimeout(() => {
      navigate("/setpassword");
    }, 3000);
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Enter OTP</h1>
      <Row className="w-100 justify-content-center shadow mt-3 p-4">
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter 6 digit OTP from Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <Button variant="primary" type="submit" className="w-30">
                Verify OTP
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
            <Toast.Body>OTP has been verified</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};

export default OTPvalidation;
