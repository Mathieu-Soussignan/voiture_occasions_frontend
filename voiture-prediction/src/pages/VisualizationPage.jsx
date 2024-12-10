import { useState, useEffect } from "react";
import axios from "axios";
import AnnéeParMarqueChart from "../components/AnnéeParMarqueChart";
import KilometrageVsPrixChart from "../components/KilometrageVsPrixChart";
import ModelPerformanceChart from "../components/ModelPerformanceChart";
import LearningCurveChart from "../components/LearningCurveChart"; // Import du composant
import { Container, Typography, Box } from "@mui/material";

function VisualizationPage() {
  const [learningCurveData, setLearningCurveData] = useState({
    trainingSizes: [],
    trainingScores: [],
    validationScores: [],
  });

  useEffect(() => {
    const fetchLearningCurveData = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const response = await axios.get(`${BACKEND_URL}/data/learning-curve-random-forest`);
        console.log("API Response for Learning Curve:", response.data);
        setLearningCurveData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de la courbe d'apprentissage :", error);
      }
    };
  
    fetchLearningCurveData();
  }, []);
  

  // Vérification des données pour chaque composant
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

        {/* Explications */}
        <Typography variant="body1" sx={{ my: 2 }}>
          Ce graphique compare les performances des différents modèles testés pour la prédiction des prix des voitures d&apos;occasion. 
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

      {/* Courbe d'apprentissage */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Courbe d&apos;Apprentissage du Random Forest Amélioré
        </Typography>

        {/* Explications */}
        <Typography variant="body1" sx={{ my: 2 }}>
          La courbe d&apos;apprentissage illustre comment le modèle Random Forest amélioré se comporte en fonction de la taille des données 
          d&apos;entraînement. Cela permet d&apos;évaluer si le modèle souffre d&apos;un biais ou d&apos;une variance élevée et d&apos;identifier
          si plus de données permettraient d&apos;améliorer les performances.
        </Typography>

        {/* Vérifiez les props passées */}
        {console.log("Training Sizes Passed to LearningCurveChart:", learningCurveData.trainingSizes)}
        {console.log("Training Scores Passed to LearningCurveChart:", learningCurveData.trainingScores)}
        {console.log("Validation Scores Passed to LearningCurveChart:", learningCurveData.validationScores)}

        {/* Graphique de la courbe d'apprentissage */}
        <LearningCurveChart
          trainingSizes={learningCurveData.trainingSizes}
          trainingScores={learningCurveData.trainingScores}
          validationScores={learningCurveData.validationScores}
        />
      </Box>
    </Container>
  );
}

export default VisualizationPage;