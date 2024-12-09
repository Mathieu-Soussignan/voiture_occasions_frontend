import AnnéeParMarqueChart from "../components/AnnéeParMarqueChart";
import KilometrageVsPrixChart from "../components/KilometrageVsPrixChart";
import ModelPerformanceChart from "../components/ModelPerformanceChart";
import { Container, Typography, Box } from "@mui/material";

function VisualizationPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analyse des Données de Voitures d&apos;Occasion
      </Typography>

      {/* Graphique des années par marque */}
      <Box sx={{ mb: 4 }}>
        <AnnéeParMarqueChart />
      </Box>

      {/* Graphique kilométrage vs prix */}
      <Box sx={{ mb: 4 }}>
        <KilometrageVsPrixChart />
      </Box>

      {/* Comparaison des performances des modèles */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comparaison des Performances des Modèles
        </Typography>

        {/* Explications */}
        <Typography variant="body1" sx={{ my: 2 }}>
          Ce graphique compare les performances des différents modèles testés pour la prédiction des prix des voitures d'occasion. 
          Voici les critères analysés :
        </Typography>
        <ul>
          <li><strong>R² :</strong> Indique la proportion de variance expliquée par le modèle.</li>
          <li><strong>RMSE :</strong> Mesure l&apos;erreur quadratique moyenne des prédictions (plus faible est meilleur).</li>
          <li><strong>MAE :</strong> Mesure l&apos;erreur absolue moyenne des prédictions (plus faible est meilleur).</li>
        </ul>
        <Typography variant="body1" sx={{ my: 2 }}>
          Le modèle <strong>Random Forest amélioré</strong> a été choisi pour sa meilleure précision globale (R² = 0.89) et des erreurs (RMSE et MAE) plus faibles que les autres modèles.
        </Typography>

        {/* Graphique des performances */}
        <ModelPerformanceChart />
      </Box>
    </Container>
  );
}

export default VisualizationPage;