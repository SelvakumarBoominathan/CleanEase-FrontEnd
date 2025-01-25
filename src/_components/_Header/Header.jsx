import React, { useState, useEffect } from "react";
import "./Header-styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Header = ({ navigateToFooter }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const bookingCount = useSelector((state) => state.bookings.count);
  const [searchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const username = searchParams.get("user");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuthenticated(true);
    }
    if (username === "admin") {
      setIsAdmin(true);
    }
  }, []);

  // const metaData = [
  //   { path: "/", name: "Home", isFunction: false },
  //   { path: "", name: "About", isFunction: true },
  //   { path: "", name: "Contact", isFunction: true },
  //   { path: "", name: "Service", isFunction: true },
  // ];

  const metaData = [
    { path: "/", name: "Home", isFunction: false },
    { path: "#about", name: "About", isFunction: true }, // Example updated path
    { path: "#contact", name: "Contact", isFunction: true },
    { path: "#service", name: "Service", isFunction: true },
  ];

  const handleLinkClick = (path) => {
    if (path.startsWith("#")) {
      const elementId = path.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with ID ${elementId} not found.`);
      }
    } else {
      window.location.href = path;
    }
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand>
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
            {metaData.map((item) =>
              item.isFunction ? (
                <Nav.Link
                  as="button"
                  key={item.name}
                  onClick={navigateToFooter}
                  className="list_item btn-link"
                >
                  {item.name}
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  to={item.path}
                  key={item.name}
                  className="list_item"
                >
                  {item.name}
                </Nav.Link>
              )
            )}
          </Nav>
          <Nav className="ms-auto w-30">
            {!isAuthenticated ? (
              <Nav className="ms-auto mt-1 mx-1">
                <Link to="/Registerpage" className="btn btn-success">
                  Sign up
                </Link>
              </Nav>
            ) : (
              <Nav className="ms-auto mt-1 mx-1">
                <Link
                  to={`/emailverification/?user=${username}`}
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
                onClick={() => localStorage.removeItem("authToken")}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Link>
            </Nav>
          </Nav>
          <Navbar.Brand className="mx-3">
            <Link to="/Cartpage" className="btn btn-success">
              <img
                alt="My Bookings"
                src="shopping-cart.svg"
                width="30"
                height="30"
                className="d-inline-block align-top mx-2"
              />
              {bookingCount > 0 && (
                <span className="badge">{bookingCount}</span>
              )}
            </Link>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
