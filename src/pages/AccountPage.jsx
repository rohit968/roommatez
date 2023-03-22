import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();

  if (!isLoggedIn) {
    return "Loading...";
  }

  if (isLoggedIn && !user) {
    return navigate("/signin");
  }

  return (
    <nav>
      <Link to="/account">My profile</Link>
      <Link to="/account/bookings">My bookings</Link>
      <Link to="/account/places">My accomodations</Link>
    </nav>
  );
};

export default AccountPage;
