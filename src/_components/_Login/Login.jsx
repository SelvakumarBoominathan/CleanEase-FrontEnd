import React, { useState } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../helper.js";
import { loginSuccess, loginFailure } from "../slices/loginslice.js";
import "./Login-styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logininfo);

  // const [validated, setValidated] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.currentTarget;

    // if (form.checkValidity() === false) {
    //   setValidated(true);
    //   event.stopPropagation();
    //   return;
    // }

    // setValidated(true);

    try {
      const userData = { username: userName, password: password };
      const response = await loginUser(userData);
      dispatch(loginSuccess(response));
      setUsername("");
      setPassword("");
      setValidated(false);
    } catch (error) {
      dispatch(loginFailure("Incorrect username or password."));
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Let's Get in!</h1>
      <Form
        className="Form-Register shadow"
        // noValidate
        // validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="mb-1 mx-3 d-grid align-items-center">
          <Form.Group as={Row} className="col-md-12" controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="userName"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3 mx-3 d-grid align-items-center">
          <Form.Group as={Row} className="col-md-12" controlId="formPassword">
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
          <Button type="submit">Login</Button>
        </Container>

        {loginState.error && (
          <div className="text-danger">{loginState.error}</div>
        )}

        <div className="register-link-container">
          <p>Not a member?</p>
          <Link className="register-link" to="/Registerpage">
            Register here
          </Link>
        </div>
        <div className="password-reset-link-container">
          <p>Forgot password?</p>
          <Link className="password-reset-link" to="/emailverification">
            Password Reset
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
