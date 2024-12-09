import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ModelPerformanceChart() {
  const data = {
    labels: ["Random Forest (base)", "Random Forest (improved)", "Gradient Boosting", "XGBoost", "CatBoost"],
    datasets: [
      {
        label: "R²",
        data: [0.87, 0.89, 0.86, 0.88, 0.93],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "RMSE",
        data: [2600, 2258, 2384, 2440, 2674],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "MAE",
        data: [1650, 1399, 1600, 1604, 1650],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ModelPerformanceChart;