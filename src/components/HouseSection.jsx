import React, { useEffect, useRef, useState } from 'react';
import { Box, Chip, Grid, Stack, Typography, Button } from '@mui/material';
import { motion, useTransform, useScroll, useInView } from 'framer-motion';

const houses = [
  {
    src: '/houses/h1.jpg',
    title: 'Modern Villa',
    subtitle: 'Luxury Living',
    rent: '$3,500/month',
    location: 'Beverly Hills, CA',
  },
  {
    src: '/houses/h2.jpg',
    title: 'Contemporary Home',
    subtitle: 'Urban Comfort',
    rent: '$2,800/month',
    location: 'Manhattan, NY',
  },
  {
    src: '/houses/h3.jpg',
    title: 'Designer Apartment',
    subtitle: 'City View',
    rent: '$4,200/month',
    location: 'Downtown, LA',
  },
];

const HouseCard = ({ house, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: 'easeOut',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '500px',
      }}
    >
      <motion.img
        src={house.src}
        alt={house.title}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        {/* Top content */}
        <Box>
          <Typography
            variant='h5'
            sx={{
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              mb: 1,
            }}
          >
            {house.title}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              mb: 1,
            }}
          >
            {house.subtitle}
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: '#4CAF50',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {house.rent}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
            }}
          >
            {house.location}
          </Typography>
        </Box>

        {/* Bottom button */}
        <Button
          variant='contained'
          sx={{
            backgroundColor: 'white',
            color: '#333',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
            alignSelf: 'flex-start',
          }}
        >
          Details
        </Button>
      </motion.div>
    </motion.div>
  );
};

const HouseSection = () => {
  const ref = useRef(null);
  const [startScrollY, setStartScrollY] = useState(0);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollY, [startScrollY, startScrollY + 300], [0, -60]);

  useEffect(() => {
    const updateScrollStart = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setStartScrollY(window.scrollY + rect.top);
      }
    };

    updateScrollStart();
    window.addEventListener('resize', updateScrollStart);
    return () => window.removeEventListener('resize', updateScrollStart);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        zIndex: 10,
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: { xs: '3rem 1rem', md: '4rem 2rem' },
          width: '100%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          margin: '0 auto',
        }}
      >
        {/* Header Section */}
        <Box
          mb={6}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Left side - Main title */}
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 200,
              letterSpacing: 5,
              fontSize: { xs: '1rem', md: '2rem' },
              flex: 1,
              mb: { xs: 3, md: 0 },
            }}
          >
            Properties under
            <br /> Management
          </Typography>

          {/* Right side - Subtitle and chip */}
          <Stack
            spacing={2}
            sx={{
              alignItems: { xs: 'center', md: 'flex-end' },
              flex: 1,
              maxWidth: '400px',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 200,
                letterSpacing: 2,
                color: '#666',
                fontSize: { xs: '0.5rem', md: '1rem' },
                textAlign: { xs: 'center', md: 'right' },
              }}
            >
              Browse our selection of top-rated modern architectural homes
              curated for you.
            </Typography>
            <Chip
              label='Top Picks'
              color='primary'
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
              }}
            />
          </Stack>
        </Box>

        {/* Houses Row */}
        <Grid container spacing={3} justifyContent='center'>
          {houses.map((house, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <HouseCard house={house} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default HouseSection;
