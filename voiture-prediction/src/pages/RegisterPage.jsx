// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
      console.log('Données envoyées :', formData); // Ajouter un log pour vérifier les données
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // S'assurer que les en-têtes sont bien définis
          },
        }
      );
      alert('Inscription réussie, vous pouvez vous connecter.');
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      alert(`Erreur lors de l'inscription: ${error.response ? error.response.data.message : 'undefined'}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Inscription
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
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
              S&apos;inscrire
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default RegisterPage;