import React from "react";
import Navbar from "../components/Navbar";
import MultiLayerParallax from "../components/MultilayerParallax";
import Hero from "../components/Hero";

const Homepage = () => {
  return (
    <>
      {/* Parallax Hero Section */}
      <MultiLayerParallax
        height="100vh"
        backgroundSpeed={0.3}
        overlaySpeed={-0.4}
      >
        <Navbar />
        <Hero />
      </MultiLayerParallax>
    </>
  );
};

export default Homepage;
