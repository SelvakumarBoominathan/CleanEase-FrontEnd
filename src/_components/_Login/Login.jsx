import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Login-styles.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated(true);

    // Need to write post method here to send the data for validation
    console.log({ name: username, pass: password });
    setUsername("");
    setPassword("");
    setValidated(false);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Lets Getin!</h1>
      <Form
        className="Form-Register shadow"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="mb-1 mx-3 d-grid align-items-center">
          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom01"
          >
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3 mx-3 d-grid align-items-center">
          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom03"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Container className="d-flex justify-content-center">
          <Button className="" type="submit">
            Login
          </Button>
        </Container>
        <div className="register-link-container">
          <p>Not a member ?</p>
          <Link className="register-link" to="/Registerpage">
            Register here
          </Link>
        </div>
        <div className="pasword-reset-link-container">
          <p>Forgot password ?</p>
          <Link className="pasword-reset-link" to="/passwordreset">
            Password Reset
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
