import React from "react";
import { Link } from "react-router-dom";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import "./accomodations.scss";

const Accomodations = () => {
  return (
    <div className="accomodations-container">
      <div className="flex">
        <Link to="/account/mypofile/new" className="link btn new-btn flex">
          <HiOutlinePlusSmall />
          Add your place
        </Link>
      </div>
    </div>
  );
};

export default Accomodations;
