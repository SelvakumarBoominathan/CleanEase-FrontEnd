import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Registerpage-styles.css";
import { Link } from "react-router-dom";

const Registerpage = () => {
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
      <h1>SignUp Nexus!</h1>
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
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              // placeholder="First name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom02"
          >
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              // placeholder="Last name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom05"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="Email"
              // placeholder="Email"
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

          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom04"
          >
            <Form.Label className="w-70">Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              // placeholder="Confirm password"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Container className="d-flex justify-content-center">
          <Button className="" type="submit">
            Register
          </Button>
        </Container>
        <Link to="/Login">Click here if already have an account.</Link>
      </Form>
    </Container>
  );
};

export default Registerpage;
