import { Box, Grid } from '@mui/material';
import React from 'react';

const ServiceSection = () => {
  return (
    <Grid container width={'xl'}>
      <Box
        sx={{
          backgroundColor: 'red',
          minWidth: '30vh',
          minHeight: '30vh',
          backgroundImage: 'url(/backgrounds/b1.png)',
        }}
      />
    </Grid>
  );
};

export default ServiceSection;
