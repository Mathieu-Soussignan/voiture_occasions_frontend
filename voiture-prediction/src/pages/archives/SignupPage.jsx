import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({ nom: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/`, {
        nom: formData.nom,
        email: formData.email,
        password: formData.password,
      });
      console.log('Inscription réussie:', response.data);
      localStorage.setItem('authToken', response.data.token);
      setSuccess(true);
      setError(null);

      // Rediriger après un petit délai pour montrer le message de succès
      setTimeout(() => {
        navigate('/predict');
      }, 2000); // Rediriger après 2 secondes
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      setError(error.response?.data?.detail || 'Erreur inconnue');
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Inscription
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nom d'utilisateur"
          name="nom"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
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
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success">
            Inscription réussie ! Redirection en cours...
          </Alert>
        )}
        <Button type="submit" variant="contained" color="primary">
        S&apos;INSCRIRE
        </Button>
      </Box>
    </Container>
  );
}

export default SignupPage;