import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, addBooking, getChecklist } from "../helper";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";
import "./Bookingpage-styles.css";

const BookingPage = () => {
  const user = useSelector((state) => state.logininfo?.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Renamed from Date
  const [selectedTime, setSelectedTime] = useState(""); // Renamed from Time
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const employeeData = await getEmployeeById(id);
        setEmployee(employeeData);
        setCategory(employeeData.category);
        const serviceList = getChecklist(category);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  useEffect(() => {
    if (bookingSuccess) {
      alert("Booking confirmed!");
      navigate("/");
    }
  }, [bookingSuccess, navigate]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      employeeId: id,
      username: user?.username,
      time: selectedTime,
      date: selectedDate.toISOString(),
    };

    try {
      await addBooking(bookingData);
      console.log(bookingData);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  // Function to disable past dates
  const disablePastDates = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
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
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileDisabled={disablePastDates}
          />
        </div>
        <div className="form-group">
          <label>Select Time (One Hour intervals):</label>
          <select
            className="form-control"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
            style={{ maxHeight: "100px", overflowY: "auto" }}
          >
            <option value="">Select a time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
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
