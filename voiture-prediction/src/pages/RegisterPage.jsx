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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validation du nom d'utilisateur
    if (!formData.username) {
      newErrors.username = "Le nom d'utilisateur est requis.";
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit comporter au moins 3 caractères.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, et underscores.";
    }

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Veuillez saisir un email valide.";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit comporter au moins 8 caractères.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une lettre majuscule.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une lettre minuscule.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins un chiffre.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins un caractère spécial.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
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