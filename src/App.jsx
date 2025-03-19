import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
// import Homepage from "./_components/_Homepage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import Registerpage from "./_components/_Registerpage/Registerpage";
// import Login from "./_components/_Login/Login";
// import Emailvarification from "./_components/_Emailvarification/Emailvarification.jsx";
// import OTPvalidation from "./_components/_OTPvalidation/OTPvalidation.jsx";
// import Setpassword from "./_components/_Setpassword/Setpassword.jsx";
// import Bookingpage from "./_components/_Bookingpage/Bookingpage.jsx";
// import Cartpage from "./_components/_Cart/Cart.jsx";
// import { Suspense } from "react";

// lazy components
const Homepage = React.lazy(() => import("./_components/_Homepage.jsx"));
const Registerpage = React.lazy(() =>
  import("./_components/_Registerpage/Registerpage")
);
const Login = React.lazy(() => import("./_components/_Login/Login"));
const Emailvarification = React.lazy(() =>
  import("./_components/_Emailvarification/Emailvarification.jsx")
);
const OTPvalidation = React.lazy(() =>
  import("./_components/_OTPvalidation/OTPvalidation.jsx")
);
const Setpassword = React.lazy(() =>
  import("./_components/_Setpassword/Setpassword.jsx")
);
const Bookingpage = React.lazy(() =>
  import("./_components/_Bookingpage/Bookingpage.jsx")
);
const Cartpage = React.lazy(() => import("./_components/_Cart/Cart.jsx"));

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
