import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Registerpage-styles.css";
import { Link } from "react-router-dom";
import { passwordvalidate } from "../validate.js";
import { useDispatch, useSelector } from "react-redux";

const Registerpage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  console.log(users);
  const [formInput, setFormInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((currentInput) => ({
      ...currentInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    // Validate passwords
    const errors = await passwordvalidate({ password: formInput.password });
    if (errors !== "Password is strong") {
      setValidationError(errors);
      return;
    }

    if (formInput.password !== formInput.confirmpassword) {
      setValidationError("Passwords do not match");
      return;
    }

    //To check validity of the input elements
    if (form.checkValidity && !form.checkValidity()) {
      setValidated(true);
      event.stopPropagation();
      return;
    }
    // console.log(formInput);

    setValidated(true);
    setFormInput({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>SignUp Nexus!</h1>
      <Form
        className="Form-Register shadow "
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              // placeholder="First name"
              name="name"
              defaultValue={formInput.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom02"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              // placeholder="Last name"
              name="username"
              defaultValue={formInput.username}
              onChange={handleChange}
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
              name="email"
              defaultValue={formInput.email}
              onChange={handleChange}
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
              name="password"
              defaultValue={formInput.password}
              onChange={handleChange}
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
              name="confirmpassword"
              defaultValue={formInput.confirmpassword}
              onChange={handleChange}
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
        {validationError && (
          <div className="text-danger">{validationError}</div>
        )}
        <Container className="d-flex justify-content-center">
          <Button type="submit" onSubmit={() => dispatch(setUsers())}>
            Register
          </Button>
        </Container>
        <div className="login-Link-container">
          <p>Already have an account ?</p>
          <Link className="login-link" to="/Login">
            Click here
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Registerpage;
