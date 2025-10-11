// import React, { useState, useEffect } from "react";
// import "./Header-styles.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// const Header = ({ navigateToFooter }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const bookingCount = useSelector((state) => state.bookings.count);
//   const [searchParams] = useSearchParams();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const username = searchParams.get("user");

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     if (authToken) {
//       setIsAuthenticated(true);
//     }
//     if (username === "admin") {
//       setIsAdmin(true);
//     }
//   }, []);

//   const metaData = [
//     { path: "/", name: "Home", isFunction: false },
//     { path: "#about", name: "About", isFunction: true }, // Example updated path
//     { path: "#contact", name: "Contact", isFunction: true },
//     { path: "#service", name: "Service", isFunction: true },
//   ];

//   const handleLinkClick = (path) => {
//     if (path.startsWith("#")) {
//       const elementId = path.substring(1);
//       const element = document.getElementById(elementId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       } else {
//         console.warn(`Element with ID ${elementId} not found.`);
//       }
//     } else {
//       window.location.href = path;
//     }
//   };

//   return (
//     <Navbar expand="lg" className="navbar">
//       <Container>
//         <Navbar.Brand>
//           <img
//             alt=""
//             src="logo.svg"
//             width="40"
//             height="40"
//             className="d-inline-block align-top"
//           />{" "}
//           <h6 className="title">CleanEase</h6>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-left list-name">
//             {metaData.map((item) =>
//               item.isFunction ? (
//                 <Nav.Link
//                   as="button"
//                   key={item.name}
//                   onClick={navigateToFooter}
//                   className="list_item btn-link"
//                 >
//                   {item.name}
//                 </Nav.Link>
//               ) : (
//                 <Nav.Link
//                   as={Link}
//                   to={item.path}
//                   key={item.name}
//                   className="list_item"
//                 >
//                   {item.name}
//                 </Nav.Link>
//               )
//             )}
//           </Nav>
//           <Nav className="ms-auto w-30">
//             {!isAuthenticated ? (
//               <Nav className="ms-auto mt-1 mx-1">
//                 <Link to="/Registerpage" className="btn btn-success">
//                   Sign up
//                 </Link>
//               </Nav>
//             ) : (
//               <Nav className="ms-auto mt-1 mx-1">
//                 <Link
//                   to={`/emailverification/?user=${username}`}
//                   className="btn btn-success"
//                 >
//                   Reset Password
//                 </Link>
//               </Nav>
//             )}
//             <Nav className="ms-auto mt-1 mx-1">
//               <Link
//                 to="/login"
//                 className="btn btn-danger"
//                 onClick={() => localStorage.removeItem("authToken")}
//               >
//                 {isAuthenticated ? "Logout" : "Login"}
//               </Link>
//             </Nav>
//           </Nav>
//           <Navbar.Brand className="mx-3">
//             <Link to="/Cartpage" className="btn btn-success">
//               <img
//                 alt="My Bookings"
//                 src="shopping-cart.svg"
//                 width="30"
//                 height="30"
//                 className="d-inline-block align-top mx-2"
//               />
//               {bookingCount > 0 && (
//                 <span className="badge">{bookingCount}</span>
//               )}
//             </Link>
//           </Navbar.Brand>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

// 🟦 Header.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Header-styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Header = ({ navigateToFooter }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const bookingCount = useSelector((state) => state.bookings.count);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) setIsAuthenticated(true);
  }, []);

  const metaData = [
    { path: "/", name: "Home", isFunction: false },
    { path: "#about", name: "About", isFunction: true },
    { path: "#contact", name: "Contact", isFunction: true },
    { path: "#service", name: "Service", isFunction: true },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleLinkClick = (path) => {
    if (path.startsWith("#")) {
      const el = document.getElementById(path.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = path;
    }
  };

  return (
    <motion.nav
      className="navbar header-theme"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <Container>
        <Navbar.Brand as={motion.div} variants={itemVariants}>
          <img src="logo.svg" width="40" height="40" alt="logo" />
          <h6 className="title">CleanEase</h6>
        </Navbar.Brand>

        <Nav className="ms-left list-name">
          {metaData.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              {item.isFunction ? (
                <Nav.Link as="button" onClick={navigateToFooter} className="list_item btn-link">
                  {item.name}
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to={item.path} className="list_item">
                  {item.name}
                </Nav.Link>
              )}
            </motion.div>
          ))}
        </Nav>

        <motion.div className="nav-buttons" variants={itemVariants}>
          {!isAuthenticated ? (
            <Link to="/Registerpage" className="btn btn-primary mx-2">
              Sign up
            </Link>
          ) : (
            <Link to={`/emailverification/?user=${username}`} className="btn btn-primary mx-2">
              Reset Password
            </Link>
          )}
          <Link
            to="/login"
            className="btn btn-danger mx-2"
            onClick={() => localStorage.removeItem("authToken")}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Link>
          <Link to="/Cartpage" className="btn btn-success mx-2">
            <img src="shopping-cart.svg" width="25" height="25" alt="cart" />
            {bookingCount > 0 && <span className="badge">{bookingCount}</span>}
          </Link>
        </motion.div>
      </Container>
    </motion.nav>
  );
};

export default Header;

