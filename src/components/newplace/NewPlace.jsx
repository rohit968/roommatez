import React, { useState } from "react";
import Perks from "../perks/Perks";
import axios from "axios";
import "./newplace.scss";
import { useNavigate } from "react-router-dom";

const NewPlace = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState();
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [noOfGuests, setNoOfGuests] = useState(1);

  const uploadPhoto = (e) => {
    console.log("Hello");
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/uploads", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => [...prev, ...filenames]);
      });
  };

  const addNewPlace = async (e) => {
    e.preventDefault();

    await axios.post("/addnewplace", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      noOfGuests,
    });
    console.log("ADD");
    navigate("/account/places");
  };

  return (
    <div className="newplace-form flex">
      <form className="form-container" onSubmit={addNewPlace}>
        <div className="title form-sub-section">
          <h3 className="label-heading">Title</h3>
          <p className="label-description">Add a fancy title for your place</p>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="address form-sub-section">
          <h3 className="label-heading">Address</h3>
          <p className="label-description">Complete address to your place</p>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="photos form-sub-section">
          <h3 className="label-heading">Photos</h3>
          <p className="label-description">
            Beautiful pictures of your beautiful place
          </p>
          <div className="image-container">
            {addedPhotos.length > 0 &&
              addedPhotos.map((photo) => (
                <div className="images" key={photo}>
                  <img
                    src={"http://localhost:4000/" + photo}
                    className="singleimage"
                  />
                </div>
              ))}
          </div>
          <label className="upload-btn flex">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => uploadPhoto(e)}
            />
            Upload
          </label>
        </div>

        <div className="description form-sub-section">
          <h3 className="label-heading">Description</h3>
          <p className="label-description">Description of the place</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="perks form-sub-section">
          <h3 className="label-heading">Perks</h3>
          <p className="label-description">
            Select all the perks of your place
          </p>
          <div>
            <Perks selected={perks} onChange={setPerks} />
          </div>

          <div className="extrainfo form-sub-section">
            <h3 className="label-heading">Extra-Info</h3>
            <p className="label-description">Some house rules, etc.</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
          </div>

          <h2>Check in & Check out time</h2>
          <p>
            Select a check in and check out time and don't forget to keep some
            buffer between them
          </p>
          <div className="checkin-out-guests">
            <div className="checkin form-sub-section">
              <h3 className="label-heading">CheckIn Time</h3>
              <input
                type="time"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="checkout form-sub-section">
              <h3 className="label-heading">CheckOut Time</h3>
              <input
                type="time"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <div className="numberofguests form-sub-section">
              <h3 className="label-heading">Number of Guests</h3>
              <div className="countofguests">
                <span onClick={() => setNoOfGuests(noOfGuests + 1)}>+</span>
                <input
                  type="number"
                  placeholder="2"
                  value={noOfGuests}
                  onChange={(e) => setNoOfGuests(e.target.value)}
                />
                <span
                  onClick={() => {
                    if (noOfGuests >= 2) {
                      setNoOfGuests(noOfGuests - 1);
                    }
                  }}
                >
                  -
                </span>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn newplace-btn">
          Save the place
        </button>
      </form>
    </div>
  );
};

export default NewPlace;
