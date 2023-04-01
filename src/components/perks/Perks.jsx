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
        <input
          type="checkbox"
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleBoxClick}
        />
        <span>Wifi</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleBoxClick}
        />
        <span>Free Parking</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("pets")}
          name="pets"
          onChange={handleBoxClick}
        />
        <span>Pets</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("breakfast")}
          name="breakfast"
          onChange={handleBoxClick}
        />
        <span>Breakfast</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("pool")}
          name="pool"
          onChange={handleBoxClick}
        />
        <span>Swimming Pool</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("tv")}
          name="tv"
          onChange={handleBoxClick}
        />
        <span>TV</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("spa")}
          name="spa"
          onChange={handleBoxClick}
        />
        <span>SPA</span>
      </label>
    </div>
  );
};

export default Perks;
