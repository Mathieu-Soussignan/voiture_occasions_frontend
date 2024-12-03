import AnnéeParMarqueChart from "../components/AnnéeParMarqueChart";
import KilometrageVsPrixChart from "../components/KilometrageVsPrixChart";
import { Container, Typography, Box } from "@mui/material";

function VisualizationPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analyse des Données de Voitures d&apos;Occasion
      </Typography>
      <Box sx={{ mb: 4 }}>
        <AnnéeParMarqueChart />
      </Box>
      <Box sx={{ mb: 4 }}>
        <KilometrageVsPrixChart />
      </Box>
      {/* Ajouter d'autres composants de visualisation ici */}
    </Container>
  );
}

export default VisualizationPage;