// import React, { useState, useEffect } from "react";
// import { Container, Button, Form, Row } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../helper.js";
// import {
//   loginSuccess,
//   loginFailure,
//   clearError,
// } from "../slices/loginslice.js";
// import "./Login-styles.css";

// const Login = () => {
//   const dispatch = useDispatch();
//   const loginState = useSelector((state) => state.logininfo);
//   const navigate = useNavigate();
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Clear error on component mount
//     dispatch(clearError());
//   }, [dispatch]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const userData = { username: userName, password: password };
//       const response = await loginUser(userData);
//       dispatch(loginSuccess(response));
//       setUsername("");
//       setPassword("");
//       navigate(`/?user=${userName}`);
//     } catch (error) {
//       console.error("Login error:", error);
//       dispatch(loginFailure("Incorrect username or password."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-90">
//       <h1 id="header">Let's Get in!</h1>
//       <Form className="Form-Register shadow" onSubmit={handleSubmit}>
//         <Row className="mb-1 mx-3 d-grid align-items-center">
//           <Form.Group as={Row} className="col-md-12" controlId="formUserName">
//             <Form.Label>User Name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               placeholder="First name"
//               name="userName"
//               value={userName}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </Form.Group>
//         </Row>

//         <Row className="mb-3 mx-3 d-grid align-items-center">
//           <Form.Group as={Row} className="col-md-12" controlId="formPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               required
//               type="password"
//               placeholder="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//         </Row>

//         <Container className="d-flex justify-content-center">
//           <Button type="submit" disabled={loading}>
//             {loading ? "Loading..." : "Login"}
//           </Button>
//         </Container>

//         {loginState.error && (
//           <div className="text-danger">{loginState.error}</div>
//         )}

//         <div className="register-link-container">
//           <p>Not a member?</p>
//           <Link className="register-link" to="/Registerpage">
//             Register here
//           </Link>
//         </div>
//         <div className="password-reset-link-container">
//           <p>Forgot password?</p>
//           <Link className="password-reset-link" to="/emailverification">
//             Password Reset
//           </Link>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/api.js";
import {
  loginSuccess,
  loginFailure,
  clearError,
} from "../slices/loginslice.js";
import "./Login-styles.css";
import { motion } from "framer-motion";

// 🌌 Floating Animations
const floatingVariants = {
  animate: {
    y: [0, -30, 0],
    rotate: [0, 360],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.2, duration: 0.5, type: "spring" },
  }),
};

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logininfo);
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userData = { username: userName, password };
      const response = await loginUser(userData);
      dispatch(loginSuccess(response));
      setUsername("");
      setPassword("");
      navigate(`/?user=${userName}`);
    } catch (error) {
      dispatch(loginFailure("Incorrect username or password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)", // 🌈 New background
        color: "#fff",
      }}
    >
      {/* Floating Orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(0,224,255,0.4), transparent 80%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 60%, rgba(255,0,150,0.4), transparent 80%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{ position: "relative", zIndex: 2 }}
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
          style={{
            color: "#00e0ff",
            textShadow: "0 0 25px rgba(0,224,255,0.6)",
            marginBottom: "1rem",
          }}
        >
          Welcome Back 🚀
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          className="Form-Register shadow-lg"
          style={{
            width: "340px",
            padding: "2rem",
            borderRadius: "20px",
            background:
              "linear-gradient(145deg, rgba(40,55,90,0.95), rgba(25,30,55,0.9))",
            boxShadow: "0 0 30px rgba(0,224,255,0.3)",
            border: "1px solid rgba(0,224,255,0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated Border */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(120deg, rgba(0,224,255,0.5), rgba(255,0,150,0.5), rgba(0,224,255,0.5))",
              backgroundSize: "300% 300%",
              zIndex: 0,
              opacity: 0.5,
            }}
          />

          <Form
            onSubmit={handleSubmit}
            style={{ position: "relative", zIndex: 2 }}
          >
            <motion.div
              custom={0}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#00e0ff" }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    background: "#0f1424",
                    color: "#fff",
                    border: "1px solid rgba(0,224,255,0.3)",
                  }}
                />
              </Form.Group>
            </motion.div>

            <motion.div
              custom={1}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <Form.Group className="mb-4">
                <Form.Label style={{ color: "#00e0ff" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    background: "#0f1424",
                    color: "#fff",
                    border: "1px solid rgba(0,224,255,0.3)",
                  }}
                />
              </Form.Group>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0,224,255,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="d-grid"
            >
              <Button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(90deg, #00e0ff, #ff0096)",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,224,255,0.4)",
                }}
              >
                {loading ? "Authenticating..." : "Login"}
              </Button>
            </motion.div>
          </Form>

          {loginState.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ color: "#ff6b6b", marginTop: "1rem" }}
            >
              {loginState.error}
            </motion.p>
          )}

          <div className="text-center mt-3">
            <p style={{ color: "#cbd2f2" }}>Not a member?</p>
            <Link to="/Registerpage" style={{ color: "#00e0ff" }}>
              Register here
            </Link>
            <br />
            <p style={{ color: "#cbd2f2", marginTop: "0.5rem" }}>
              Forgot password?
            </p>
            <Link to="/emailverification" style={{ color: "#ff0096" }}>
              Reset password
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
