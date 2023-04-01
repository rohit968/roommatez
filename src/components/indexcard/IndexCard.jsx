import React from "react";
import { Link } from "react-router-dom";

import { IoLocationOutline } from "react-icons/io5";
import "./indexcard.scss";

const IndexCard = ({ place }) => {
  console.log(place);
  return (
    <Link to={"place/" + place._id} className="homecard-places">
      <div className="index-card">
        <div className="index-card-image">
          <img
            src={process.env.REACT_APP_BASE_URL + place.photos[0]}
            alt="index card image"
          />
        </div>

        <div className="index-card-content">
          <h2>{place.title}</h2>
          <p className="truncate">{place.description}</p>
          <p>${place.price} per night</p>
          <p className="place-address">
            <IoLocationOutline /> {place.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default IndexCard;
