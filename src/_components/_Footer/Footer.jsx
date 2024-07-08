import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import "./Footer-styles.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h4>Contact Us</h4>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-white border-0">
                <h2>CleanEase</h2>
              </ListGroup.Item>
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
