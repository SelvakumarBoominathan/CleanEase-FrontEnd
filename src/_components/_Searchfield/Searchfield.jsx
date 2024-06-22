import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Searchfield = () => {
  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-center d-flex flex-column p-5 ">
        <Card className="text-center">
          <Card.Body className="text-center">
            <Card.Title>
              Search for <span className="span">SERVICES!</span>
            </Card.Title>
            <Card.Text>Transforming spaces, one clean at a time</Card.Text>
          </Card.Body>
        </Card>
        <Form inline>
          <Row className="pt-5 d-flex justify-content-center">
            <Col xs="auto p-2">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto p-2">
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  );
};

export default Searchfield;
