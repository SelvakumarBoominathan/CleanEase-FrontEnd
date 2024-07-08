import React from "react";
import Searchfield from "./_Searchfield/Searchfield";
import Body from "./_Body/Body";
import Header from "./_Header/Header";
import Footer from "./_Footer/Footer.jsx";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Searchfield />
      <Body />
      <Footer />
    </div>
  );
};

export default Homepage;
