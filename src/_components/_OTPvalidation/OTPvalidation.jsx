import "./OTPvalidation-styles.css";
import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Toast,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateOTP } from "../helper";

const OTPvalidation = () => {
  const [otp, setotp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await validateOTP(otp);
      setShowAlert(true);
      //to navigate to another component
      setTimeout(() => {
        navigate("/setpassword");
      }, 3000);
    } catch (error) {
      console.error(
        "Error validate OTP:",
        error.response?.data || error.message
      );
      setError("Incorrect OTP!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-100">
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert alert-success" role="alert">
            OTP has been verified!
          </div>
        </div>
      )}
      {error && (
        <div className="alert-overlay">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      <h1>Enter OTP</h1>
      <Row className="fixed-width justify-content-center shadow mt-3 pt-4 pb-4">
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicotp">
              <Form.Label>Enter OTP received in email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <Button
                variant="primary"
                type="submit"
                className="w-30"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          </Form>
          <Toast
            onClose={() => setShowAlert(false)}
            show={showAlert}
            delay={3000}
            autohide
            className="position-fixed top-0 start-50 translate-middle-x m-3"
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
