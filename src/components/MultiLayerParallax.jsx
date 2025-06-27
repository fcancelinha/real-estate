/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import overlayImage from '/backgrounds/nobg.png';

const MultiLayerParallax = ({
  children,
  height = '100vh',
  backgroundSpeed = 0.5,
  overlaySpeed = -0.4,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(window.scrollY + rect.top);
      }
    };

    updateContainerPosition();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateContainerPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateContainerPosition);
    };
  }, []);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0.1,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  // Only apply parallax when the container is in view
  const containerBottom =
    containerTop + (containerRef.current?.offsetHeight || 0);
  const isInView =
    scrollY + window.innerHeight >= containerTop && scrollY <= containerBottom;
  const relativeScroll = Math.max(0, scrollY - containerTop);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Layer */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          transform: isInView
            ? `translateY(${relativeScroll * backgroundSpeed}px)`
            : 'translateY(0px)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#3fa8d5',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* Overlay Layer - Fixed to this section */}
      {overlayImage && (
        <motion.div
          animate={controls}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%',
            transform: isInView
              ? `translateY(${-relativeScroll * Math.abs(overlaySpeed)}px)`
              : 'translateY(0px)',
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${overlayImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>
      )}

      {/* Content Layer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MultiLayerParallax;
