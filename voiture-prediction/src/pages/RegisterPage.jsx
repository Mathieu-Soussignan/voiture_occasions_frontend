// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/RegisterPage.css'; // Fichier CSS pour les styles personnalisés

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
      console.log('Données envoyées :', formData);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
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
    <div className="register-container">
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={handleSubmit}>
          <h2>Inscription</h2>
          {errors.username && <p className="error">{errors.username}</p>}
          {errors.email && <p className="error">{errors.email}</p>}
          {errors.password && <p className="error">{errors.password}</p>}
          <div className="inputBox">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <span>Nom d&apos;utilisateur</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span>Mot de passe</span>
            <i></i>
          </div>
          <input type="submit" id="submit" value="S'inscrire" />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;