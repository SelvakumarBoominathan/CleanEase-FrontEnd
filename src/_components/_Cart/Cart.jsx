// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { Container, Table, Image, Button } from "react-bootstrap";

// const CartBookingPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const userId = useSelector((state) => state.userInfo.id); // Assuming userInfo slice has the user's id

//   useEffect(() => {
//     // Fetch the user's booking details from the backend
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(`/api/users/${userId}/bookings`);
//         setBookings(response.data.bookings); // Assuming the response has a bookings array
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };

//     fetchBookings();
//   }, [userId]);

//   return (
//     <Container className="my-5">
//       <h2>My Bookings</h2>
//       {bookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>City</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking, index) => (
//               <tr key={index}>
//                 <td>
//                   <Image src={booking.employeeImage} rounded width={50} />{" "}
//                   {booking.employeeName}
//                 </td>
//                 <td>{booking.city}</td>
//                 <td>{new Date(booking.date).toLocaleDateString()}</td>
//                 <td>{booking.time}</td>
//                 <td>
//                   <Button variant="danger">Cancel</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No bookings available.</p>
//       )}
//     </Container>
//   );
// };

// export default CartBookingPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  // Function to fetch bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem("token"); // Replace with your token storage mechanism
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.bookings);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching bookings.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <h3>{booking.employeeName}</h3>
              <img
                src={booking.employeeImage}
                alt={booking.employeeName}
                style={{ width: "100px" }}
              />
              <p>City: {booking.city}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Time: {booking.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default CartPage;
