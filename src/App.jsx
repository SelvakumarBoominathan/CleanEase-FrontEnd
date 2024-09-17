import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Homepage from "./_components/_Homepage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Registerpage from "./_components/_Registerpage/Registerpage";
import Login from "./_components/_Login/Login";
import Emailvarification from "./_components/_Emailvarification/Emailvarification.jsx";
import OTPvalidation from "./_components/_OTPvalidation/OTPvalidation.jsx";
import Setpassword from "./_components/_Setpassword/Setpassword.jsx";
import Bookingpage from "./_components/_Bookingpage/Bookingpage.jsx";

function App() {
  return (
    <React.StrictMode>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Registerpage" element={<Registerpage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/emailverification" element={<Emailvarification />} />
            <Route path="/otpvalidation" element={<OTPvalidation />} />
            <Route path="/setpassword" element={<Setpassword />} />
            <Route path="/bookingpage/:id" element={<Bookingpage />} />
          </Routes>
        </Router>
      </div>
    </React.StrictMode>
  );
}

export default App;
