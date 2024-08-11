import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Searchfield-styles.css";
import React, { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Searchfield = () => {
  // place holder effect using useState and useEffect
  // const [placeholder, setPlaceholder] = useState('Search "Fan Cleaning"');
  const [service, setService] = useState("All");
  const [cost, setCost] = useState("All");
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const service_options = [
    { label: "All", value: 0 },
    { label: "House Cleaner", value: 1 },
    { label: "Car Cleaner", value: 2 },
    { label: "Kitchen Cleaner", value: 3 },
    { label: "Gardener", value: 4 },
    { label: "Electrition", value: 5 },
    { label: "Plumber", value: 6 },
    { label: "AC service", value: 7 },
    { label: "Vessel Washer", value: 8 },
  ];
  const cost_options = [300, 500, 700, 1000];

  const handleServiceChange = useCallback((Service) => {
    setService(Service);
  }, []);

  const handleCostChange = useCallback((Cost) => {
    setCost(Cost);
  }, []);

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-center d-flex flex-column p-5 ">
        <div className="text-field">
          <h1>
            Filter for <span className="Span">SERVICES</span>
          </h1>
          <h6>
            Welcome <b>{username}</b>! Home services at your doorstep.
          </h6>
        </div>
        <Container className="d-flex mt-3">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="ms-auto  mt-1 mx-2"
            >
              Filter by service : {service}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {service_options.map((service_option) => (
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => handleServiceChange(service_option.label)}
                  key={service_option.value}
                >
                  {service_option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="ms-auto  mt-1 w-100"
            >
              Filter by cost : {cost}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {cost_options.map((cost_option, index) => (
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => handleCostChange(cost_option)}
                  key={index}
                >
                  {cost_option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default Searchfield;

// useEffect(() => {
// const options = [
//   "Fan Cleaning",
//   "Bathroom Cleaning",
//   "Kitchen Cleaning",
//   "Hall Cleaning",
// ];
// let index = 0;
// const interval = setInterval(() => {
//   index = (index + 1) % options.length;
//   setPlaceholder(`Search "${options[index]}"`);
// }, 1500);
// return () => clearInterval(interval); // Cleanup interval on component unmount
// }, []);

{
  /* <Form>
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
        </Form> */
}
