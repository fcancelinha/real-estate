import React from 'react';
import Navbar from '../components/Navbar';
import MultiLayerParallax from '../components/MultilayerParallax';
import Hero from '../components/Hero';
import HouseSection from '../components/HouseSection'; // ← Import it
import { Box } from '@mui/material';
import mainBg from '/backgrounds/nobg.png';
import ServiceSection from '../components/ServiceSection';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Navbar />
      <MultiLayerParallax
        overlayImage={mainBg}
        height='100vh'
        backgroundSpeed={0.3}
        overlaySpeed={-0.4}
      >
        <Hero />
      </MultiLayerParallax>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: { xs: '3rem 1rem', md: '2rem 3rem' },
        }}
      >
        <HouseSection />
        <ServiceSection />
      </Box>
    </Box>
  );
};

export default Home;
