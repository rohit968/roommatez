import React from "react";
import "./hero.scss";

const Hero = () => {
  return (
    <div
      className="hero-container"
      style={{
        backgroundColor: "black",
        background:
          "url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') no-repeat top /cover",
      }}
    ></div>
  );
};

export default Hero;
