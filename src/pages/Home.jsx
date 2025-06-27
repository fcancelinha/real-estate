import React from 'react';
import Navbar from '../components/Navbar';
import MultiLayerParallax from '../components/MultilayerParallax';
import Hero from '../components/Hero';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <>
      <Navbar />
      <MultiLayerParallax
        height='100vh'
        backgroundSpeed={0.3}
        overlaySpeed={-0.4}
      >
        <Hero />
      </MultiLayerParallax>
    </>
  );
};

export default Home;
