import React from 'react';
import Navbar from '../components/Navbar';
import MultiLayerParallax from '../components/MultilayerParallax';
import Hero from '../components/Hero';
import HouseSection from '../components/HouseSection'; // ← Import it
import { Box } from '@mui/material';
import ServicesSection from '../components/ServicesSection';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Navbar />
      <MultiLayerParallax
        height='100vh'
        backgroundSpeed={0.3}
        overlaySpeed={-0.4}
      >
        <Hero />
      </MultiLayerParallax>
      <HouseSection />
    </Box>
  );
};

export default Home;
