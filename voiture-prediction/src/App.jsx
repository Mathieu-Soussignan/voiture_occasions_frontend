// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import NavBar from './pages/NavBar';
import PredictionForm from './PredictionForm';
import VisualizationPage from "./pages/VisualizationPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';

function App() {
  const { isLoggedIn } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    // Vérifier l'état initial de connexion pour ajuster l'affichage
  }, []);

  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: "#c6deef",
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
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes>
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
                      <LoginPage />
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