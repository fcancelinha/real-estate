/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Space", "Home", "City", "Comfort", "Life"];

const slideVariants = {
  initial: {
    y: "-100%",
    opacity: 0,
    position: "absolute",
  },
  enter: {
    y: "0%",
    opacity: 1,
    position: "absolute",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    position: "absolute",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export default function RotatingWordsHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Typography
            variant="h2"
            color="white"
            display="flex"
            alignItems="center"
            sx={{ lineHeight: 1.2, fontFamily: "Inter", fontWeight: 300 }}
          >
            Your Place,&nbsp;Your&nbsp;
            <Box
              sx={{
                display: "inline-block",
                position: "relative",
                overflow: "hidden",
                height: "1.2em",
                width: "8ch",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  variants={slideVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    color: "white",
                  }}
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </Box>
          </Typography>

          <Typography
            variant="h4"
            color="white"
            sx={{
              fontFamily: "Inter",
              fontWeight: 100,
            }}
            mt={1}
          >
            Your new flat in <i>Madrid</i>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
