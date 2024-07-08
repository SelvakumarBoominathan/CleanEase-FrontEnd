import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import "./Footer-styles.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-dark py-4 mt-5">
      <Container>
        <Row>
          <ListGroup.Item className="bg-dark text-white border-0">
            <img
              alt=""
              src="logo.svg"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            <h6 className="header">CleanEase</h6>
          </ListGroup.Item>
          <Col md={5}>
            <h6>Company</h6>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-white border-0">
                134, Ritchie St, Besant Nagar
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0">
                Chennai, Tamilnadu, 600001
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0">
                Phone: (123) 456-7890
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0">
                Email: duncan.green@ethereal.email
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
