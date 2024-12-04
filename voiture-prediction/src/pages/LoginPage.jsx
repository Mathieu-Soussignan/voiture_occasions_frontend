// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

function LoginPage({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, formData);
      const { access_token } = response.data;

      if (!access_token) {
        throw new Error('Le token JWT est manquant dans la réponse de l\'API.');
      }

      // Sauvegarder le token JWT
      localStorage.setItem('token', access_token);

      // Définir l'utilisateur comme connecté
      setIsLoggedIn(true);

      // Rediriger vers la page de prédiction après la connexion
      navigate('/predict');

      alert('Connexion réussie !');
    } catch (error) {
      if (error.response) {
        console.error('Erreur réponse API', error.response.data);
        alert(`Erreur: ${error.response.data.detail || 'Impossible de se connecter'}`);
      } else {
        console.error('Erreur réseau ou autre', error.message);
        alert('Erreur réseau, veuillez vérifier votre connexion.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nom d'utilisateur"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Se connecter
            </Button>
          </Box>
        </form>
        <Box mt={3} textAlign="center">
          <Typography variant="body1">
            Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
};

export default LoginPage;