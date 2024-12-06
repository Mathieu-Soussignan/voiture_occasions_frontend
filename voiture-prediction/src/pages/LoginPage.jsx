import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

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
      // Sauvegarder le token JWT
      localStorage.setItem('token', access_token);
      // Mettre à jour l'état de connexion
      setIsLoggedIn(true);
      // Rediriger vers la page de prédiction après la connexion
      navigate('/predict');
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      alert('Erreur lors de la connexion');
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

export default LoginPage;