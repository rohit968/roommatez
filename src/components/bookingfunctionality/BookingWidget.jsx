import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import "./bookingwidget.scss";

const BookingWidget = ({ place }) => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  let numberOfNights = 0;
  if (checkInDate && checkOutDate) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  }

  const bookPlace = async () => {
    const data = {
      checkInDate,
      checkOutDate,
      guests,
      name,
      contact,
      placeId: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/booking", data);
    const bookingId = response.data._id;
    navigate(`/account/booking/${bookingId}`);
  };

  return (
    <div className="bookingwidget">
      <div className="dates">
        <div className="checkinout">
          <label htmlFor="checkindate">
            Checkin:
            <input
              type="date"
              id="checkindate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </label>
          <label htmlFor="checkindate">
            Checkout:
            <input
              type="date"
              id="checkoutdate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </label>
        </div>
        <label htmlFor="noofguests">Number of Guests:</label>
        <input
          type="number"
          id="noofguests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        {numberOfNights > 0 && (
          <>
            <label htmlFor="name">Your name: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="mobile">Your contact number: </label>
            <input
              type="tel"
              id="mobile"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="price">
        <h3>Price: ${place?.price} / per night</h3>
        <button className="btn book-btn" onClick={bookPlace}>
          Book this place{" "}
          {numberOfNights > 0 ? "- $" + numberOfNights * place.price : ""}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
