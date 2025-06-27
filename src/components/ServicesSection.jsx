import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ServicesSection = () => {
  const backgroundImage = '/backgrounds/m2.jpg';

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1rem',
      }}
    >
      <Container>
        <Typography variant='h6'>
          We provide tailored architectural and design services that blend
          modernism with function, offering elegant, sustainable living and
          commercial solutions.
        </Typography>
      </Container>
    </Box>
  );
};

export default ServicesSection;
