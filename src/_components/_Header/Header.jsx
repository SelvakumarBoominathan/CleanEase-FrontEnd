import React from "react";
import "./Header-styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { count } = useSelector((state) => state.bookings);
  // const username = useSelector((state) => state.logininfo.user.username);
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
                  to={`/emailverification/?user=${username}`}
                  // to="/emailverification"
                  className="btn btn-success"
                >
                  {/* {isAdmin ? "Manage data" : "Reset Password"} */}
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
          <Navbar.Brand href="#home" className="mx-3">
            {/* <Link to="/Cartpage" className="btn btn-success">
              {" "}
              <img
                alt="My Bookings"
                src="shopping-cart.svg"
                width="30"
                height="30"
                className="d-inline-block align-top mx-2"
              />{" "}
            </Link> */}

            <Link to="/Cartpage" className="btn btn-success">
              <img
                alt="My Bookings"
                src="shopping-cart.svg"
                width="30"
                height="30"
                className="d-inline-block align-top mx-2"
              />
              {count > 0 && ( // Display count only if greater than 0
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  {count}
                </span>
              )}
            </Link>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
