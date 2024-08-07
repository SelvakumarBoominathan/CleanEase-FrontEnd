import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Searchfield-styles.css";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Searchfield = () => {
  // place holder effect using useState and useEffect
  const [placeholder, setPlaceholder] = useState('Search "Fan Cleaning"');
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");

  useEffect(() => {
    const options = [
      "Fan Cleaning",
      "Bathroom Cleaning",
      "Kitchen Cleaning",
      "Hall Cleaning",
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % options.length;
      setPlaceholder(`Search "${options[index]}"`);
    }, 1500);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-center d-flex flex-column p-5 ">
        <div className="text-field">
          <h1>
            Search for <span className="Span">SERVICES</span>
          </h1>
          <h6>
            Welcome <b>{username}</b>! Home services at your doorstep.
          </h6>
        </div>

        <Form>
          <Row className="pt-5 d-flex justify-content-center">
            <Col xs="auto p-2">
              <Form.Control
                type="text"
                placeholder={placeholder}
                className="mr-sm-4"
              />
            </Col>
            <Col xs="auto p-2">
              <Button type="submit" className="d-flex justify-content-between">
                <img src="search.svg" />
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  );
};

export default Searchfield;
