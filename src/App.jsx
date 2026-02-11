// import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import "bootstrap/dist/css/bootstrap.min.css";


// lazy components
const Homepage = lazy(() => import("./_components/_Homepage.jsx"));
const Registerpage = lazy(() => import("./_components/_Registerpage/Registerpage.jsx"));
const Login = lazy(() => import("./_components/_Login/Login.jsx"));
const Emailvarification = lazy(
  () => import("./_components/_Emailvarification/Emailvarification.jsx"),
);
const OTPvalidation = lazy(
  () => import("./_components/_OTPvalidation/OTPvalidation.jsx"),
);
const Setpassword = lazy(
  () => import("./_components/_Setpassword/Setpassword.jsx"),
);
const Bookingpage = lazy(
  () => import("./_components/_Bookingpage/Bookingpage.jsx"),
);
const Cartpage = lazy(() => import("./_components/_Cart/Cart.jsx"));

function App() {
  return (
    <React.StrictMode>
      <div>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Registerpage" element={<Registerpage />} />
              <Route path="/Login" element={<Login />} />
              <Route
                path="/emailverification"
                element={<Emailvarification />}
              />
              <Route path="/otpvalidation" element={<OTPvalidation />} />
              <Route path="/setpassword" element={<Setpassword />} />
              <Route path="/bookingpage/:id" element={<Bookingpage />} />
              <Route path="/Cartpage" element={<Cartpage />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </React.StrictMode>
  );
}

export default App;
