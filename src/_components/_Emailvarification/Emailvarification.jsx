import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./Emailvarification-styles.css";
import { useNavigate } from "react-router-dom";

const Email_verification = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send OTP to the entered email
    // Example: sendOtp(email);

    // Show alert for email submission
    setShowAlert(true);
    console.log({ email: email });

    // Navigate to another component after some time
    setTimeout(() => {
      setShowAlert(false); // Hide alert after some time
      navigate("/otpvalidation");
    }, 3000);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90 position-relative">
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert alert-success" role="alert">
            OTP has been sent to your email!
          </div>
        </div>
      )}
      <h1>Enter Email</h1>
      <Row className="w-100 justify-content-center shadow mt-3 p-4">
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Email_verification;
