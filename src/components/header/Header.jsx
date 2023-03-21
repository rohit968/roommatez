import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi";
import { UserContext } from "../../UserContext";
import logo from "../../assets/logo.png";
import "./header.scss";

const Header = () => {
  const [userOption, setUserOption] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  const handleUserOptionToggle = () => {
    setUserOption(!userOption);
  };

  return (
    <nav role="navbar" className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" className="logo-image" />
      </Link>
      <div className="nav-links">
        <Link to="/places" className="link">
          places
        </Link>
        <Link to="/host-page" className="link">
          become a host
        </Link>
      </div>
      <div className="account-buttons">
        <Link to="/liked" style={{ padding: "0" }}>
          <IoMdHeartEmpty className="like-icon" title="Liked Places" />
        </Link>
        {isLoggedIn ? (
          <HiUserCircle
            className="user-icon"
            onClick={handleUserOptionToggle}
          />
        ) : (
          <Link to="/signin" className="link btn reverse-btn">
            signin
          </Link>
        )}
        {userOption && (
          <div className="user-option">
            <Link to="/account" className=" link user-link">
              Account
            </Link>
            <Link to="/" className="link user-link">
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  ); 
};

export default Header;
