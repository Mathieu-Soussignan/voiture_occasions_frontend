import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleStartPrediction = () => {
    navigate('/predict');
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '80px' }}>
      <Box sx={{ textAlign: 'center', marginTop: '5rem' }}>
        <Typography variant="h2" gutterBottom>
          Bienvenue sur Prédict Car
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Découvrez la valeur de votre prochaine voiture d&apos;occasion grâce à notre outil de prédiction.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartPrediction}
          sx={{ marginTop: '2rem' }}
        >
          Commencer la Prédiction
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;