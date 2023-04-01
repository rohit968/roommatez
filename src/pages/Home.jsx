import axios from "axios";
import React, { useEffect, useState } from "react";
import IndexCard from "../components/indexcard/IndexCard";
import Hero from "../components/hero/Hero";
import "./home.scss";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/places").then((data) => {
      setData(data?.data);
    });
  }, []);

  return (
    <>
      <Hero />
      <div className="indexCards">
        {data.length > 0 && data.map((place) => <IndexCard place={place} />)}
      </div>
    </>
  );
};

export default Home;
