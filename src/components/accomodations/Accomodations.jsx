import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import "./accomodations.scss";

const Accomodations = () => {
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      console.log(data);
      setAccomodations(data);
    });
  }, []);

  return (
    <div className="accomodations-container">
      <div className="flex">
        <Link to="/account/places/new" className="link btn new-btn flex">
          <HiOutlinePlusSmall />
          Add your place
        </Link>
      </div>
      <div className="myaccomodations">
        <div>
          {accomodations?.length > 0 &&
            accomodations.map((accomodation) => {
              console.log(accomodation);
              return (
                <Link
                  to={"/account/places/" + accomodation._id}
                  className="single-accomodation"
                >
                  <div className="accomodation-image">
                    {accomodation.photos.length > 0 && (
                      <img
                        src={
                          process.env.REACT_APP_BASE_URL +
                          accomodation.photos[0]
                        }
                        alt=""
                        className="image"
                      />
                    )}
                  </div>
                  <div className="accomodation-content">
                    <h1 className="accomodation-title">{accomodation.title}</h1>
                    <p className="accomodation-description truncate">
                      {accomodation.description}
                    </p>
                    <p className="accomodation-address">
                      <IoLocationOutline /> {accomodation.address}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Accomodations;
