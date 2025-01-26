import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBookingCount } from "../slices/bookingsSlice";
import { Link } from "react-router-dom";
import "./Cart-styles.css";

const Cartpage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Function to fetch bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No user found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/Cartpage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.bookings);
      dispatch(setBookingCount(response.data.bookings.length));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching bookings.");
    }
  };

  // Function to remove a booking
  const removeBooking = async (bookingId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No user found. Please log in.");
      return;
    }

    try {
      // Make a DELETE request to the backend to remove the booking
      await axios.delete("http://localhost:8000/api/removeBooking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { bookingId }, // Send the booking ID to be removed
      });

      // Update the bookings state to reflect the removal
      const updatedBookings = bookings.filter(
        (booking) => booking._id !== bookingId
      );
      setBookings(updatedBookings); // Update the state
      dispatch(setBookingCount(updatedBookings.length));
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
      <h2>Total Bookings: {bookings.length}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookings && bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
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
                onClick={() => removeBooking(booking._id)}
                className="remove-button"
              >
                Remove Booking
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
      <div className="back-home-container">
        <button
          onClick={() => (window.location.href = "/")}
          className="back-home-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Cartpage;
