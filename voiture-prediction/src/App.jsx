// src/App.jsx
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import NavBar from './pages/NavBar';
import PredictionForm from './PredictionForm';
import VisualizationPage from './pages/VisualizationPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import { useState } from 'react';

import './App.css';

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');
  
  // Création de l'état pour gérer le mode sombre
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#303030' : '#c6deef',
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: isMobile ? '0.875rem' : '1rem',
            padding: isMobile ? '6px 16px' : '8px 22px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: isMobile ? '8px 0' : '16px 0',
          },
        },
      },
    },
  });

  // Configuration des animations fun
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: -100,
    },
    in: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      scale: 0.8,
      x: 100,
    },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 150,
    damping: 25,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {isLoggedIn ? (
              <>
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <HomePage />
                    </motion.div>
                  }
                />
                <Route
                  path="/predict"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <PredictionForm />
                    </motion.div>
                  }
                />
                <Route
                  path="/visualize"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <VisualizationPage />
                    </motion.div>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <LoginPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <RegisterPage />
                    </motion.div>
                  }
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </AnimatePresence>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}