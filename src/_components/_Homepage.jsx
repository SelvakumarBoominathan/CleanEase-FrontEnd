import React, { useState, useRef } from "react";
import Searchfield from "./_Searchfield/Searchfield";
import Body from "./_Body/Body";
import Header from "./_Header/Header";
import Footer from "./_Footer/Footer.jsx";

const Homepage = () => {
  // lifted state for filteration
  const [service, setService] = useState("All");
  const [cost, setCost] = useState("All");

  // Reference for the footer section
  const footerRef = useRef(null);

  // Function to scroll to footer
  const navigateToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header navigateToFooter={navigateToFooter} />
      <Searchfield
        service={service}
        cost={cost}
        setService={setService}
        setCost={setCost}
      />
      <Body service={service} cost={cost} />
      <Footer ref={footerRef} />
    </div>
  );
};

export default Homepage;
