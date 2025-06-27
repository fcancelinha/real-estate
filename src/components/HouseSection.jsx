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

// Reusable styles
const styles = {
  textWhiteBold: {
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    mb: 1,
  },
  textWhiteLight: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
    mb: 1,
  },
  textGreen: {
    color: '#4CAF50',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    mb: 1,
  },
  textWhiteFaded: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
  },
  headerTitle: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 350,
    letterSpacing: 2,
    fontSize: { xs: '1.5rem', md: '2rem' },
    mb: { xs: 3, md: 0 },
    lineHeight: 1.3,
    maxWidth: '100%',
    whiteSpace: 'normal',
  },
  headerSubtitle: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 250,
    letterSpacing: 1,
    color: '#666',
    fontSize: { xs: '0.8rem', md: '1rem' },
    textAlign: { xs: 'center', md: 'right' },
  },
  chip: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
  },
};

// Animation variants
const cardVariants = {
  hidden: { y: -60, opacity: 0 },
  visible: index => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: index * 0.25,
      ease: 'easeInOut',
    },
  }),
};

const HouseCard = ({ house, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.15 });

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '450px',
        backgroundColor: '#000',
      }}
    >
      <motion.img
        src={house.src}
        alt={house.title}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <Box>
          <Typography variant='h5' sx={styles.textWhiteBold}>
            {house.title}
          </Typography>
          <Typography variant='subtitle1' sx={styles.textWhiteLight}>
            {house.subtitle}
          </Typography>
          <Typography variant='h6' sx={styles.textGreen}>
            {house.rent}
          </Typography>
          <Typography variant='body2' sx={styles.textWhiteFaded}>
            {house.location}
          </Typography>
        </Box>

        <Button
          variant='contained'
          sx={{
            backgroundColor: 'white',
            color: '#333',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            alignSelf: 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
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

  const y = useTransform(scrollY, [startScrollY, startScrollY + 300], [0, -40]);

  useEffect(() => {
    const updateStart = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setStartScrollY(window.scrollY + rect.top);
      }
    };

    updateStart();
    window.addEventListener('resize', updateStart);
    return () => window.removeEventListener('resize', updateStart);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <Stack
        sx={{
          backgroundColor: '#fff',
          padding: { xs: '3rem 1rem', md: '2rem 3rem' },
          borderTopLeftRadius: { xs: 0, md: 40 },
          borderTopRightRadius: { xs: 0, md: 40 },
        }}
      >
        {/* Header */}
        <Box
          mb={10}
          maxWidth={'xl'}
          width={'73vw'}
          alignSelf={'center'}
          sx={{
            display: 'flex',
            marginTop: 4,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant='h2' sx={styles.headerTitle}>
            Properties under
            <br />
            Management
          </Typography>

          <Stack
            spacing={2}
            sx={{ alignItems: { xs: 'center', md: 'flex-end' }, maxWidth: 400 }}
          >
            <Typography variant='h6' sx={styles.headerSubtitle}>
              Browse our selection of top-rated modern architectural homes
              curated for you.
            </Typography>
            <Chip label='Top Picks' color='primary' sx={styles.chip} />
          </Stack>
        </Box>

        {/* Cards */}
        <Grid container spacing={5} justifyContent='center'>
          {houses.map((house, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <HouseCard house={house} index={index} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </motion.div>
  );
};

export default HouseSection;
