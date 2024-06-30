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
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

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

    console.log({
      name: name,
      userName: userName,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    });
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmpassword("");
    setValidated(false);
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
              defaultValue=""
              onChange={(e) => setName(e.target.value)}
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
              defaultValue=""
              onChange={(e) => setUsername(e.target.value)}
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
              defaultValue=""
              onChange={(e) => setEmail(e.target.value)}
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
              defaultValue=""
              onChange={(e) => setPassword(e.target.value)}
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
              defaultValue=""
              onChange={(e) => setConfirmpassword(e.target.value)}
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
