import axios from "axios";
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/booking").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return <div>Bookings</div>;
};

export default Bookings;
