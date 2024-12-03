import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import axios from "axios";

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis l'API après authentification
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Typography>Chargement des informations utilisateur...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Profil Utilisateur
        </Typography>
        <Typography variant="h6">Nom : {userData.username}</Typography>
        <Typography variant="h6">Email : {userData.email}</Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={() => localStorage.removeItem("accessToken")}>
            Se Déconnecter
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default UserProfile;