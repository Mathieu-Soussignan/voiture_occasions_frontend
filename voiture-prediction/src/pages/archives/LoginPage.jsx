import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialise les erreurs avant une nouvelle tentative

    const loginData = {
        email: formData.email,
        password: formData.password
    };

    console.log('Données envoyées pour la connexion:', loginData);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, loginData);
        const { access_token } = response.data;

        // Stocker le token dans le local storage
        localStorage.setItem('authToken', access_token);

        // Rediriger vers la page de prédiction
        navigate('/predict');
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        setError('E-mail ou mot de passe incorrect.');
    }
};

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="E-mail"
          name="email"  // Assurez-vous que cela correspond à votre schéma backend
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Se connecter
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;