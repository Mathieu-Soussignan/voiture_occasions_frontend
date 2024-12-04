// src/pages/AdvancedRegisterPage.jsx
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Container, Typography, Box, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';

// Schéma de validation avec Yup
const schema = yup.object().shape({
  username: yup.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères').required('Nom d\'utilisateur requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .required('Mot de passe requis'),
});

function AdvancedRegisterPage() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log('Données envoyées :', data);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Inscription réussie, vous pouvez vous connecter.');
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      alert(`Erreur lors de l'inscription: ${error.response ? error.response.data.message : 'undefined'}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Inscription Avancée
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nom d'utilisateur"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                  required
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  required
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  label="Mot de passe"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
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

export default AdvancedRegisterPage;