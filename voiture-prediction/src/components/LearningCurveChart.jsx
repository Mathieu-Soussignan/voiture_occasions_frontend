import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

// Enregistrement des composants de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LearningCurveChart = ({ trainingSizes, trainingScores, validationScores }) => {
  // Logs pour vérifier les données
  console.log("Training Sizes:", trainingSizes);
  console.log("Training Scores:", trainingScores);
  console.log("Validation Scores:", validationScores);

  // Vérification de la validité des données
  const isDataValid =
    trainingSizes.length > 0 && trainingScores.length > 0 && validationScores.length > 0;

  // Données pour le graphique
  const data = {
    labels: trainingSizes,
    datasets: [
      {
        label: "Erreur d'entraînement (MSE)",
        data: trainingScores,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.4,
      },
      {
        label: "Erreur de validation (MSE)",
        data: validationScores,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  // Options pour le graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Courbe d'apprentissage - Random Forest amélioré",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Taille des données d'entraînement",
        },
      },
      y: {
        title: {
          display: true,
          text: "Erreur quadratique moyenne (MSE)",
        },
      },
    },
  };

  // Rendu conditionnel si les données sont invalides
  if (!isDataValid) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <p>Aucune donnée valide disponible pour le graphique.</p>
      </div>
    );
  }

  return <Line data={data} options={options} />;
};

LearningCurveChart.propTypes = {
  trainingSizes: PropTypes.array.isRequired,
  trainingScores: PropTypes.array.isRequired,
  validationScores: PropTypes.array.isRequired,
};

export default LearningCurveChart;