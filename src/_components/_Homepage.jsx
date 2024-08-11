import React, { useState } from "react";
import Searchfield from "./_Searchfield/Searchfield";
import Body from "./_Body/Body";
import Header from "./_Header/Header";
import Footer from "./_Footer/Footer.jsx";

const Homepage = () => {
  // lifted state for filteration
  const [service, setService] = useState("All");
  const [cost, setCost] = useState("All");

  return (
    <div>
      <Header />
      <Searchfield
        service={service}
        cost={cost}
        setService={setService}
        setCost={setCost}
      />
      <Body service={service} cost={cost} />
      <Footer />
    </div>
  );
};

export default Homepage;
