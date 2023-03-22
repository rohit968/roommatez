import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./myprofile.scss";

const Myprofile = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  if (!user) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="profile-container">
      <p className="profile-user-details">
        Logged in as <span>{user.name}</span> ({user.email})
      </p>
    </div>
  );
};

export default Myprofile;
