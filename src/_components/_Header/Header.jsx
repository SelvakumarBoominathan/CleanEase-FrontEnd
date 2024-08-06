import React from "react";
import "./Header-styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const username = useSelector((state) => state.logininfo.user.username);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const metaData = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/contact",
      name: "Contact",
    },
    {
      path: "/service",
      name: "Service",
    },
  ];

  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="logo.svg"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          <h6 className="title">CleanEase</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-left list-name">
            {metaData.map((item) => (
              <Nav.Link href={item.path} key={item.name}>
                <div className="list_item">{item.name}</div>
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto w-30">
            {!isAuthenticated ? (
              <Nav className="ms-auto  mt-1 mx-1">
                <Link to="/Registerpage" className="btn btn-success">
                  Sign up
                </Link>
              </Nav>
            ) : (
              <Nav className="ms-auto  mt-1 mx-1">
                <Link
                  to={`/emailverification?user=${username}`}
                  // to="/emailverification"
                  className="btn btn-success"
                >
                  Reset Password
                </Link>
              </Nav>
            )}
            <Nav className="ms-auto mt-1 mx-1">
              <Link
                to="/login"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
