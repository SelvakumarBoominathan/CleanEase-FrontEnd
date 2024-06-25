import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./_components/_Homepage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Registerpage from "./_components/_Registerpage/Registerpage";
import Login from "./_components/_Login/Login";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Registerpage" element={<Registerpage />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
