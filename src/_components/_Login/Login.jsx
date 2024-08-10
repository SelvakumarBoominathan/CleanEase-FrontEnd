import React, { useState } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../helper.js";
import { loginSuccess, loginFailure } from "../slices/loginslice.js";
import "./Login-styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logininfo);
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = { username: userName, password: password };
      // console.log("Sending user data:", userData);
      const response = await loginUser(userData);
      // console.log("Login response:", response); //Log response from loginUser
      dispatch(loginSuccess(response));
      setUsername("");
      setPassword("");
      navigate(`/?user=${userName}`);
    } catch (error) {
      console.error("Login error:", error); // Log error
      dispatch(loginFailure("Incorrect username or password."));
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1>Let's Get in!</h1>
      <Form className="Form-Register shadow" onSubmit={handleSubmit}>
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
