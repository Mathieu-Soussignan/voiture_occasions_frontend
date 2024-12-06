import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';
import axios from 'axios';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      // Récupérer les détails de l'utilisateur à partir de l'API
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails utilisateur', error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};