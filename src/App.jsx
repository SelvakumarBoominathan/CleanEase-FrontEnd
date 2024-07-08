import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./_components/_Homepage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Registerpage from "./_components/_Registerpage/Registerpage";
import Login from "./_components/_Login/Login";
import _Emailvarification from "./_components/_Emailvarification/Emailvarification.jsx";
import OTPvalidation from "./_components/_OTPvalidation/OTPvalidation.jsx";
import Setpassword from "./_components/_Setpassword/Setpassword.jsx";


function App() {
  return (
    <React.StrictMode>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Registerpage" element={<Registerpage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/emailverification" element={<_Emailvarification />} />
            <Route path="/otpvalidation" element={<OTPvalidation />} />
            <Route path="/setpassword" element={<Setpassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
}

export default App;
