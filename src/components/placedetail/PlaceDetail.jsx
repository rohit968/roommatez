import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoLocationOutline, IoCloseCircleSharp } from "react-icons/io5";
import "./placedetail.scss";
import BookingWidget from "../bookingfunctionality/BookingWidget";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="allphotoscontainer">
        <div className="content">
          <h2 className="allphotosheading">All photos for {place.title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="btn close-btn"
          >
            <IoCloseCircleSharp />
            Close
          </button>
        </div>
        {place?.photos?.length > 0 &&
          place.photos.map((photo) => (
            <div className="allphotos">
              <img
                src={process.env.REACT_APP_BASE_URL + photo}
                className="image"
              />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="singlepage-container">
      <div className="singlepage-image-container">
        <div className="main-image">
          {place?.photos[0] && (
            <div className="big-image">
              <img
                src={process.env.REACT_APP_BASE_URL + place.photos[0]}
                className="singlepage-image"
              />
            </div>
          )}
        </div>
        <div className="more-images">
          {place?.photos[1] && (
            <div className="side-images-1">
              <img
                src={process.env.REACT_APP_BASE_URL + place.photos[1]}
                className="singlepage-image"
              />
            </div>
          )}
          <div style={{ display: "flex" }}>
            {place?.photos[2] && (
              <div className="side-images-2">
                <img
                  src={process.env.REACT_APP_BASE_URL + place.photos[2]}
                  className="singlepage-image"
                />
              </div>
            )}
            {place?.photos[3] && (
              <>
                <div className="side-images-3">
                  <img
                    src={process.env.REACT_APP_BASE_URL + place.photos[3]}
                    className="singlepage-image image-3"
                  />
                  <button
                    className="allphotosbtn btn"
                    onClick={() => setShowAllPhotos(true)}
                  >
                    Show all photos
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="singlepage-content">
        <h1 className="singlepage-title">{place?.title}</h1>
        <p className="singlepage-address">
          <IoLocationOutline />
          {place?.address}
        </p>

        <div className="singlepage-description">
          <h2 className="description-heading">About this home</h2>
          <p className="description-content">{place?.description}</p>
        </div>
        <div className="check-price">
          <div className="check">
            <h3>
              Check-in :<p> {place?.checkIn}</p>
            </h3>
            <h3>
              Check-out : <p>{place?.checkOut}</p>
            </h3>
            <h3>
              Max no of Guests : <p>{place?.maxGuests}</p>
            </h3>
          </div>
          <BookingWidget place={place} />
        </div>

        <div className="singlepage-description">
          <h2 className="description-heading">Extra-info</h2>
          <p className="description-content">{place?.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
