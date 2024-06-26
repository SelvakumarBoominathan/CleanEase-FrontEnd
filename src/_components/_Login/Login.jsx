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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Lets Getin!</h1>
      <Form
        className="Form-Register"
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
              // placeholder="First name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
              // placeholder="password"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Container className="d-flex justify-content-center">
          <Button className="" type="submit">
            Login
          </Button>
        </Container>
        <Link to="/Registerpage">Register If Dont have an account.</Link>
      </Form>
    </Container>
  );
};

export default Login;
