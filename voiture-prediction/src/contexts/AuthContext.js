import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crée un contexte pour l'authentification
export const AuthContext = createContext();

// Fournisseur d'authentification
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifie si l'utilisateur est connecté en vérifiant la présence du token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Fournir l'état d'authentification et la fonction de mise à jour
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Type de validation pour les props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personnalisé pour accéder au contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }

  return context;
}