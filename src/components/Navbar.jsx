import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import logo from '/logos/l5nbb.png';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  Icon,
  Toolbar,
  Typography,
} from '@mui/material';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AppBar
      elevation={0}
      position='absolute'
      sx={{
        marginTop: 2,
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              alt='logo brand'
              sx={{
                backgroundImage: `url(${logo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: 48,
                height: 48,
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 175,
                letterSpacing: 10,
              }}
            >
              WANG ESTATES
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                verticalAlign: 'middle',
                alignItems: 'center',
                gap: 2,
                overflow: 'hidden', // Prevent scrollbar
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(15px)',
                  transition: 'all 0.25s ease-out',
                  pointerEvents: isHovered ? 'auto' : 'none',
                }}
              >
                <LocalPhoneOutlinedIcon
                  sx={{
                    fontSize: 15,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 175,
                    fontSize: 12,
                  }}
                >
                  + 99 9999 9999
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(15px)',
                  transition: 'all 0.25s ease-out',
                  pointerEvents: isHovered ? 'auto' : 'none',
                }}
              >
                <MailOutlinedIcon
                  sx={{
                    fontSize: 15,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 175,
                    fontSize: 12,
                  }}
                >
                  info@email.com
                </Typography>
              </Box>
              <Chip
                color='white'
                label='Contact Us'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontFamily: 'Inter',
                  fontWeight: 300,
                  paddingX: 2,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease-out',
                  flexShrink: 0, // Prevent shrinking
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
