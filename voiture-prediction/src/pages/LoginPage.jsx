import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import '../pages/styles/LoginPage.css';

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
      localStorage.setItem('token', access_token);
      setIsLoggedIn(true);
      navigate('/predict');
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      alert('Erreur lors de la connexion');
    }
  };

  return (
    <div className="login-container">
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span>Mot de passe</span>
            <i></i>
          </div>
          <div className="links">
            <Link to="/register">Créer un compte</Link>
          </div>
          <input type="submit" id="submit" value="Se connecter" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;