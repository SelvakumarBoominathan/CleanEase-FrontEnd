import React, { useState } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../slices/registerslice.js";
import { passwordvalidate } from "../validate.js";
import "./Registerpage-styles.css";
import { registerUser } from "../helper.js";

const Registerpage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userInfo.users); // Corrected selector
  const Navigate = useNavigate();

  // console.log(users);

  const [formInput, setFormInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [validated, setValidated] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state variable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((currentInput) => ({
      ...currentInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form submitted with:", formInput);
    const form = event.currentTarget;

    const errors = await passwordvalidate({ password: formInput.password });
    if (errors !== "Password is strong") {
      setValidationError(errors);
      return;
    }

    if (formInput.password !== formInput.confirmpassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (form.checkValidity && !form.checkValidity()) {
      setValidated(true);
      event.stopPropagation();
      return;
    }

    try {
      const userData = {
        name: formInput.name,
        username: formInput.username,
        email: formInput.email,
        password: formInput.password,
      };
      const response = await registerUser(userData);
      dispatch(setUsers(response));
      setValidated(true);
      setFormInput({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      setValidationError("");
      setRegistrationSuccess(true); // Set success state

      setTimeout(() => {
        Navigate("/Login");
      }, 3000);
    } catch (error) {
      setValidationError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Signup here!</h1>
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formInput.name}
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
              name="username"
              value={formInput.username}
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
              type="email"
              name="email"
              value={formInput.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom03"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={formInput.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Row}
            className="col-md-12"
            controlId="validationCustom04"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="confirmpassword"
              value={formInput.confirmpassword}
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
        {registrationSuccess && (
          <div className="text-success">Registration successful!</div>
        )}
        <Container className="d-flex justify-content-center">
          <Button type="submit">Register</Button>
        </Container>
        <div className="login-Link-container">
          <p>Already have an account?</p>
          <Link className="login-link" to="/Login">
            Click here
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Registerpage;
