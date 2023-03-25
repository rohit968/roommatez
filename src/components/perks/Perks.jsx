import React from "react";
import "./perks.scss";

const Perks = ({ selected, onChange }) => {
  const handleBoxClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectdName) => selectdName !== name)]);
    }
  };

  return (
    <div className="perks-container">
      <label>
        <input type="checkbox" name="wifi" onChange={handleBoxClick} />
        <span>Wifi</span>
      </label>
      <label>
        <input type="checkbox" name="parking" onChange={handleBoxClick} />
        <span>Free Parking</span>
      </label>
      <label>
        <input type="checkbox" name="pets" onChange={handleBoxClick} />
        <span>Pets</span>
      </label>
      <label>
        <input type="checkbox" name="breakfast" onChange={handleBoxClick} />
        <span>Breakfast</span>
      </label>
      <label>
        <input type="checkbox" name="pool" onChange={handleBoxClick} />
        <span>Swimming Pool</span>
      </label>
      <label>
        <input type="checkbox" name="tv" onChange={handleBoxClick} />
        <span>TV</span>
      </label>
      <label>
        <input type="checkbox" name="spa" onChange={handleBoxClick} />
        <span>SPA</span>
      </label>
    </div>
  );
};

export default Perks;
