import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../helper.js";
import {
  loginSuccess,
  loginFailure,
  clearError,
} from "../slices/loginslice.js";
import "./Login-styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logininfo);
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear error on component mount
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userData = { username: userName, password: password };
      const response = await loginUser(userData);
      dispatch(loginSuccess(response));
      setUsername("");
      setPassword("");
      navigate(`/?user=${userName}`);
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure("Incorrect username or password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
      <h1 id="header">Let's Get in!</h1>
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
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
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
