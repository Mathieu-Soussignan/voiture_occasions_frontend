import { useState, useEffect } from "react";
import axios from "axios";
import AnnéeParMarqueChart from "../components/AnnéeParMarqueChart";
import KilometrageVsPrixChart from "../components/KilometrageVsPrixChart";
import ModelPerformanceChart from "../components/ModelPerformanceChart";
import LearningCurveChart from "../components/LearningCurveChart";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

function VisualizationPage() {
  const [learningCurveData, setLearningCurveData] = useState({
    trainingSizes: [],
    trainingScores: [],
    validationScores: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearningCurveData = async () => {
      try {
        const BACKEND_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        console.log("Fetching learning curve data from:", `${BACKEND_URL}/learning-curve-random-forest`);

        const response = await axios.get(`${BACKEND_URL}/learning-curve-random-forest`);
        console.log("API Response for Learning Curve:", response.data);

        if (
          response.data &&
          Array.isArray(response.data.training_sizes) &&
          Array.isArray(response.data.training_scores) &&
          Array.isArray(response.data.validation_scores)
        ) {
          setLearningCurveData({
            trainingSizes: response.data.training_sizes,
            trainingScores: response.data.training_scores,
            validationScores: response.data.validation_scores,
          });
        } else {
          throw new Error("Invalid data format received from the API.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de la courbe d'apprentissage :",
          error
        );
        setError("Erreur lors du chargement des données. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchLearningCurveData();
  }, []);

  // Vérification des données
  console.log("Learning Curve Data:", learningCurveData);

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

        <Typography variant="body1" sx={{ my: 2 }}>
          Ce graphique compare les performances des différents modèles testés pour la prédiction
          des prix des voitures d&apos;occasion. Voici les critères analysés :
        </Typography>
        <ul>
          <li>
            <strong>R² :</strong> Indique la proportion de variance expliquée par le modèle.
          </li>
          <li>
            <strong>RMSE :</strong> Mesure l&apos;erreur quadratique moyenne des prédictions (plus
            faible est meilleur).
          </li>
          <li>
            <strong>MAE :</strong> Mesure l&apos;erreur absolue moyenne des prédictions (plus
            faible est meilleur).
          </li>
        </ul>
        <Typography variant="body1" sx={{ my: 2 }}>
          Le modèle <strong>Random Forest amélioré</strong> a été choisi pour sa meilleure précision
          globale (R² = 0.89) et des erreurs (RMSE et MAE) plus faibles que les autres modèles.
        </Typography>

        {/* Graphique des performances */}
        <ModelPerformanceChart />
      </Box>

      {/* Courbe d'apprentissage */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Courbe d&apos;Apprentissage du Random Forest Amélioré
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          La courbe d&apos;apprentissage illustre comment le modèle Random Forest amélioré se
          comporte en fonction de la taille des données d&apos;entraînement. Cela permet
          d&apos;évaluer si le modèle souffre d&apos;un biais ou d&apos;une variance élevée et
          d&apos;identifier si plus de données permettraient d&apos;améliorer les performances.
        </Typography>

        {/* Chargement */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Chargement des données...</Typography>
          </Box>
        )}

        {/* Erreur */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Affichage du graphique */}
        {!loading && !error && (
          <LearningCurveChart
            trainingSizes={learningCurveData.trainingSizes}
            trainingScores={learningCurveData.trainingScores}
            validationScores={learningCurveData.validationScores}
          />
        )}
      </Box>
    </Container>
  );
}

export default VisualizationPage;