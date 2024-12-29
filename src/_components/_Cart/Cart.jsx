import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cart-styles.css";

const Cartpage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  // Function to fetch bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/Cartpage", {
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

  // Function to remove a booking
  const removeBooking = async (bookingId, indexToRemove) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      // Make a DELETE request to the backend to remove the booking
      const response = await axios.delete(
        "http://localhost:8000/api/removeBooking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { bookingId }, // Send the booking ID to be removed
        }
      );

      console.log(response.data.message); // Log success message from the backend

      // Update the bookings state to reflect the removal
      const updatedBookings = bookings.filter(
        (_, index) => index !== indexToRemove
      );
      setBookings(updatedBookings); // Update the state
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error removing booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="Cart">
      <h1>Your Bookings</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookings && bookings.length > 0 ? (
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
              <button
                onClick={() => removeBooking(booking._id, index)} // Pass booking ID and index
                style={{
                  marginTop: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Remove Booking
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => (window.location.href = "/")} // Redirect to home
          style={{
            marginTop: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Cartpage;
