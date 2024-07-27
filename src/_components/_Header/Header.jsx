import React from "react";
import "./Header-styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
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
            <Nav className="ms-auto  mt-1 mx-1">
              <Link to="/Registerpage" className="btn btn-success">
                Sign up
              </Link>
            </Nav>
            <Nav className="ms-auto mt-1 mx-1">
              <Link
                to="/login"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
