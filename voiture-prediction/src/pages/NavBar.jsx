import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function NavBar({ darkMode, setDarkMode }) {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showLogoutTimer, setShowLogoutTimer] = useState(false);

  // Fonction pour gérer la déconnexion avec animation
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    // Afficher le timer avant la redirection
    setShowLogoutTimer(true);
    setTimeout(() => {
      setShowLogoutTimer(false);
      navigate('/login');
    }, 3000); // 3 secondes de délai
  };

  // Fonction pour gérer le changement de thème
  const handleToggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Logo avec navigation vers l'accueil */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Prédict Car Logo" style={{ height: '50px', marginRight: '60px' }} />
          </Link>

          <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <HomeIcon />
              </IconButton>
              <Typography variant="h6">Accueil</Typography>
            </Link>
            <Link to="/predict" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <DirectionsCarIcon />
              </IconButton>
              <Typography variant="h6">Prédiction</Typography>
            </Link>
            <Link to="/visualize" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <BarChartIcon />
              </IconButton>
              <Typography variant="h6">Visualisation</Typography>
            </Link>
          </Box>

          {/* Toggle Dark/Light Mode */}
          <IconButton color="inherit" onClick={handleToggleTheme} sx={{ mr: 2 }}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Bouton Connexion/Déconnexion */}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          ) : (
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color="inherit">
                Connexion / Inscription
              </Button>
            </Link>
          )}
        </Toolbar>

        {/* Bouton flottant pour "Retour en haut de la page" */}
        <IconButton
          color="primary"
          aria-label="Retour en haut"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'white',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </AppBar>

      {/* Animation de déconnexion */}
      {showLogoutTimer && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 4,
            borderRadius: 2,
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" align="center">
            Déconnexion en cours...
          </Typography>
        </Box>
      )}
    </>
  );
}

NavBar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};