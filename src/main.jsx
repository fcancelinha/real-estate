import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </StrictMode>
);
