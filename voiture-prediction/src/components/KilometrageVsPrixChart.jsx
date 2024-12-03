import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { Typography, Box } from "@mui/material";

// Enregistrer explicitement les composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function KilometrageVsPrixChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/data/clustering`
        );

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setChartData({
            datasets: [
              {
                label: "Kilométrage vs Prix",
                data: response.data.map((item) => ({
                  x: item["Kilométrage"],
                  y: item["Prix"],
                })),
                backgroundColor: "rgba(99, 132, 255, 0.6)",
              },
            ],
          });
        } else {
          setError("Aucune donnée disponible pour le graphique.");
        }
      } catch (err) {
        setError("Erreur lors du chargement des données.");
        console.error("Erreur lors du chargement des données:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <div style={{ height: "400px" }}>
        <Scatter
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: "Relation entre Kilométrage et Prix" },
            },
            scales: {
              x: { title: { display: true, text: "Kilométrage (km)" } },
              y: { title: { display: true, text: "Prix (€)" } },
            },
          }}
        />
      </div>
      <Box mt={2} p={2} style={{ backgroundColor: "#c6deef", borderRadius: "8px" }}>
        <Typography variant="body1" align="center">
          Ce graphique montre la relation entre le kilométrage et le prix des véhicules d&apos;occasion. 
          Il permet de visualiser comment le prix varie en fonction du kilométrage. On peut observer 
          que généralement, plus le kilométrage d&apos;un véhicule est élevé, plus son prix a tendance à être bas, 
          reflétant la dépréciation des véhicules avec l&apos;augmentation de leur usage.
        </Typography>
      </Box>
    </Box>
  );
}

export default KilometrageVsPrixChart;