// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import NavBar from './pages/NavBar';
import PredictionForm from './PredictionForm';
import VisualizationPage from "./pages/VisualizationPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si un token est présent dans le localStorage au chargement initial
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? "#121212" : "#c6deef",
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
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <AnimatePresence mode="wait">
          <Routes>
            {/* Si l'utilisateur n'est pas connecté, il est redirigé vers /login */}
            {!isLoggedIn ? (
              <>
                <Route
                  path="/login"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <LoginPage setIsLoggedIn={setIsLoggedIn} />
                    </motion.div>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <RegisterPage />
                    </motion.div>
                  }
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                {/* Si l'utilisateur est connecté, il peut accéder aux autres pages */}
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <HomePage />
                    </motion.div>
                  }
                />
                <Route
                  path="/predict"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PredictionForm />
                    </motion.div>
                  }
                />
                <Route
                  path="/visualize"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <VisualizationPage />
                    </motion.div>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
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