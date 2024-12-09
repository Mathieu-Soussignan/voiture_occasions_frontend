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
import PropTypes from 'prop-types';

// Enregistrer les composants de base de Chart.js
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
    console.log("Training Sizes:", trainingSizes);
    console.log("Training Scores:", trainingScores);
    console.log("Validation Scores:", validationScores);
  
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
  
    return <Line data={data} options={options} />;
  };
  
LearningCurveChart.propTypes = {
  trainingSizes: PropTypes.array.isRequired,
  trainingScores: PropTypes.array.isRequired,
  validationScores: PropTypes.array.isRequired,
};

export default LearningCurveChart;
