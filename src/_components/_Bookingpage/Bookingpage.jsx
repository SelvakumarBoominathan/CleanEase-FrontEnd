import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../helper"; // Importing the helper function
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Bookingpage-styles.css";

const BookingPage = () => {
  const { id } = useParams(); // Get employee ID from route
  const [employee, setEmployee] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const employeeData = await getEmployeeById(id); // Fetch employee by ID
        setEmployee(employeeData);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic here
    console.log(`Booking for ${employee.name} on ${date} at ${time}`);
    setBookingSuccess(true);
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="booking-container">
      <h2>Book a Service</h2>
      <div className="employee-details">
        <img src={employee.image} alt={employee.name} />
        <div>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Category:</strong> {employee.category}
          </p>
          <p>
            <strong>City:</strong> {employee.city}
          </p>
          <p>
            <strong>Price:</strong> {employee.price} INR
          </p>
          <p>
            <strong>Rating:</strong> {employee.rating.average} (
            {employee.rating.count} ratings)
          </p>
        </div>
      </div>
      <form onSubmit={handleBookingSubmit}>
        <div className="form-group">
          <label>Select Date:</label>
          <Calendar value={date} onChange={setDate} />
        </div>
        <div className="form-group">
          <label>Select Time (30-minute intervals):</label>
          <select
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="09:30 AM">09:30 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            {/* Add more time slots as needed */}
          </select>
        </div>
        <button type="submit">Confirm Booking</button>
        {bookingSuccess && (
          <p className="success-message">Booking successful!</p>
        )}
      </form>
    </div>
  );
};

export default BookingPage;
