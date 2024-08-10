import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendRegisterMail } from "../helper";
import "./Emailvarification-styles.css";
import { useSearchParams } from "react-router-dom";

const Email_verification = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [searchParams] = useSearchParams();
  // const username = searchParams.get("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //Access username from redux

    try {
      // Send OTP to the entered email using the helper function
      const userdata = await sendRegisterMail(email);
      const username = userdata.user;
      // Show alert for email submission
      setShowAlert(true);
      // console.log({ email: email });

      // Navigate to another component after some time
      setTimeout(() => {
        setShowAlert(false); // Hide alert after some time
        navigate(`/otpvalidation/?user=${username}`);
      }, 3000);
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      setError("Failed to send OTP. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
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
      {error && (
        <div className="alert-overlay">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      <h1>Enter Email</h1>
      <Row className="fixed-width justify-content-center shadow mt-3 pt-4 pb-4">
        <Col md={12}>
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
              <Button
                variant="primary"
                type="submit"
                className="w-30"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Email_verification;
