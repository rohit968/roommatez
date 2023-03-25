import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import "./accomodations.scss";

const Accomodations = () => {
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
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
      <div style={{ marginTop: "10em" }}>
        {accomodations.length > 0 &&
          accomodations.map((accomodation) => {
            <h1>{accomodation}</h1>;
          })}
      </div>
    </div>
  );
};

export default Accomodations;
