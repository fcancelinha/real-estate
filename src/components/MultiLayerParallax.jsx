import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const MultiLayerParallax = ({
  children,
  height = '100vh',
  overlayImage,
  backgroundSpeed = 0.5,
  overlaySpeed = -0.4,
}) => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [backgroundOffset, setBackgroundOffset] = useState(0);
  const [overlayOffset, setOverlayOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(window.scrollY + rect.top);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updatePosition();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  // Calculate in-view and scroll offsets
  const containerBottom = containerTop + containerHeight;
  const stopThreshold = window.innerHeight * 0.2;

  const isInView =
    scrollY + window.innerHeight >= containerTop &&
    scrollY <= containerBottom - stopThreshold;

  const relativeScroll = Math.max(0, scrollY - containerTop);

  useEffect(() => {
    if (isInView) {
      setBackgroundOffset(relativeScroll * backgroundSpeed);
      setOverlayOffset(-relativeScroll * Math.abs(overlaySpeed));
    }
  }, [isInView, relativeScroll, backgroundSpeed, overlaySpeed]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height,
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
          transform: `translateY(${backgroundOffset}px)`,
          willChange: 'transform',
          zIndex: 1,
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

      {/* Overlay Layer */}
      {overlayImage && (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '140%',
            transform: `translateY(${overlayOffset}px)`,
            willChange: 'transform',
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

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
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
