import React, { useEffect, useState } from "react";
import Perks from "../perks/Perks";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import "./newplace.scss";
import { useNavigate, useParams } from "react-router-dom";

const NewPlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState();
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      console.log(data);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

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

  const saveplace = async (e) => {
    e.preventDefault();
    console.log(addedPhotos);
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/addnewplace", {
        id,
        ...placeData,
      });
      navigate("/account/places");
    } else {
      await axios.post("/addnewplace", placeData);
    }
    console.log("ADD");
    navigate("/account/places");
  };

  const deletePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
    console.log(addedPhotos);
  };

  const setmainphoto = (filename) => {
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  };

  return (
    <div className="newplace-form flex">
      <form className="newplace-form-container" onSubmit={saveplace}>
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
                    src={process.env.REACT_APP_BASE_URL + photo}
                    className="singleimage"
                  />
                  <button className="image-btn cross">
                    <RxCrossCircled onClick={() => deletePhoto(photo)} />
                  </button>
                  {photo === addedPhotos[0] && (
                    <button className="image-btn star">
                      <HiStar onClick={() => setmainphoto(photo)} />
                    </button>
                  )}
                  {photo !== addedPhotos[0] && (
                    <button className="image-btn star">
                      <HiOutlineStar onClick={() => setmainphoto(photo)} />
                    </button>
                  )}
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
            <div className="checkin chcek-section form-sub-section">
              <h3 className="label-heading">CheckIn Time</h3>
              <input
                type="number"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="checkout chcek-section form-sub-section">
              <h3 className="label-heading">CheckOut Time</h3>
              <input
                type="number"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <div className="numberofguests chcek-section form-sub-section">
              <h3 className="label-heading">Number of Guests</h3>
              <div className="countofguests">
                <span onClick={() => setMaxGuests(parseInt(maxGuests) + 1)}>
                  +
                </span>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
                <span
                  onClick={() => {
                    if (maxGuests >= 2) {
                      setMaxGuests(parseInt(maxGuests) - 1);
                    }
                  }}
                >
                  -
                </span>
              </div>
            </div>
            <div className="price chcek-section form-sub-section">
              <h3 className="label-heading">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
