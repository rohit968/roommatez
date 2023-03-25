import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, useLocation, Navigate } from "react-router-dom";
import { FaRegUser, FaHouseUser } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";
import "./account.scss";

const Account = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const location = useLocation();

  const style = {
    color: "white",
    backgroundColor: "rgb(205, 61, 61)",
  };

  // if (!isLoggedIn) {
  //   return "Loading...";
  // }

  if (isLoggedIn && !user) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <nav className="account-navbar flex">
      <Link
        className={
          location.pathname === "/account/myprofile"
            ? "link btn account-nav-btn account-active-btn flex"
            : "link btn account-nav-btn flex"
        }
        to="/account/myprofile"
      >
        <FaRegUser />
        My profile
      </Link>
      <Link
        to="/account/bookings"
        className={
          location.pathname === "/account/bookings"
            ? "link btn account-nav-btn account-active-btn flex"
            : "link btn account-nav-btn flex"
        }
      >
        <VscListUnordered />
        My bookings
      </Link>
      <Link
        to="/account/places"
        className={
          location.pathname === "/account/places"
            ? "link btn account-nav-btn account-active-btn flex"
            : "link btn account-nav-btn flex"
        }
      >
        <FaHouseUser />
        My accomodations
      </Link>
    </nav>
  );
};

export default Account;
