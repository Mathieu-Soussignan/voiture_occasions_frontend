import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import PropTypes from 'prop-types';

function PredictionForm({ darkMode }) {
  const [formData, setFormData] = useState({
    kilometrage: 15000,
    annee: 2020,
    marque: '',
    carburant: 'Essence',
    transmission: 'Manuelle',
    modele: '',
    etat: 'Occasion',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelesDisponibles, setModelesDisponibles] = useState([]);

  const marquesDisponibles = [
    'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jeep',
    'Kia', 'Lexus', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi', 'Nissan', 'Opel',
    'Peugeot', 'Renault', 'Seat', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla',
    'Toyota', 'Volkswagen', 'Volvo'
  ];

  const modelesParMarque = {
    Audi: ['A3', 'A4', 'Q3', 'Q5'],
    BMW: ['Serie 1', 'Serie 3', 'X1', 'X5'],
    Citroën: ['C1', 'C3', 'C4', 'C5 Aircross'],
    Dacia: ['Duster', 'Sandero', 'Logan'],
    Fiat: ['500', 'Panda', 'Tipo'],
    Ford: ['Fiesta', 'Focus', 'Kuga', 'Puma'],
    Honda: ['Civic', 'CR-V', 'Jazz'],
    Hyundai: ['i20', 'i30', 'Tucson'],
    Jeep: ['Renegade', 'Compass', 'Cherokee'],
    Kia: ['Picanto', 'Ceed', 'Sportage'],
    Lexus: ['CT', 'NX', 'RX'],
    Mazda: ['Mazda2', 'Mazda3', 'CX-5'],
    Mercedes: ['A-Class', 'C-Class', 'GLC'],
    Mini: ['Cooper', 'Countryman'],
    Mitsubishi: ['ASX', 'Outlander', 'Eclipse Cross'],
    Nissan: ['Micra', 'Qashqai', 'Juke'],
    Opel: ['Corsa', 'Astra', 'Mokka'],
    Peugeot: ['208', '308', '3008', '5008'],
    Renault: ['Clio', 'Megane', 'Captur', 'Kadjar'],
    Seat: ['Ibiza', 'Leon', 'Arona'],
    Skoda: ['Fabia', 'Octavia', 'Kodiaq'],
    Smart: ['ForTwo', 'ForFour'],
    Subaru: ['Impreza', 'XV', 'Outback'],
    Suzuki: ['Swift', 'Vitara', 'S-Cross'],
    Tesla: ['Model 3', 'Model S', 'Model X'],
    Toyota: ['Yaris', 'Corolla', 'RAV4'],
    Volkswagen: ['Polo', 'Golf', 'Tiguan'],
    Volvo: ['XC40', 'XC60', 'S60']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'marque') {
      setModelesDisponibles(modelesParMarque[value] || []);
      setFormData(prevData => ({
        ...prevData,
        modele: '',
      }));
    }
  };

  const handleSliderChange = (field) => (event, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/predict_combined`,
          formData
        );
        setPrediction(response.data);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la prédiction', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Prédiction des Voitures d&apos;Occasion
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Caractéristiques du Véhicule</Typography>
        <FormControl fullWidth>
          <Typography gutterBottom>Kilométrage (en km)</Typography>
          <Slider
            value={formData.kilometrage}
            onChange={handleSliderChange('kilometrage')}
            min={0}
            max={300000}
            step={1000}
            valueLabelDisplay="auto"
            name="kilometrage"
          />
        </FormControl>
        <FormControl fullWidth>
          <Typography gutterBottom>Année de Mise en Circulation</Typography>
          <Slider
            value={formData.annee}
            onChange={handleSliderChange('annee')}
            min={1980}
            max={2024}
            step={1}
            valueLabelDisplay="auto"
            name="annee"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Marque</InputLabel>
          <Select
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            label="Marque"
          >
            {marquesDisponibles.map((marque) => (
              <MenuItem key={marque} value={marque}>
                {marque}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Modèle</InputLabel>
          <Select
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            disabled={!formData.marque}
            label="Modèle"
          >
            {modelesDisponibles.map((modele) => (
              <MenuItem key={modele} value={modele}>
                {modele}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Transmission</InputLabel>
          <Select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            label="Transmission"
          >
            <MenuItem value="Manuelle">Manuelle</MenuItem>
            <MenuItem value="Automatique">Automatique</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Type de Carburant</InputLabel>
          <Select
            name="carburant"
            value={formData.carburant}
            onChange={handleChange}
            label="Type de Carburant"
          >
            <MenuItem value="Essence">Essence</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Hybride">Hybride</MenuItem>
            <MenuItem value="Électrique">Électrique</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="État"
          variant="outlined"
          name="etat"
          type="text"
          value={formData.etat}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          Prédire le Prix
        </Button>
      </Box>

      {loading && (
        <Box mt={2}>
          <LinearProgress />
          <Typography variant="body2" align="center" mt={2}>
            Prédiction en cours, veuillez patienter...
          </Typography>
        </Box>
      )}

      {prediction && (
        <>
          {console.log(prediction, darkMode)}
          <Card
            sx={{
              maxWidth: 500,
              margin: '20px auto',
              backgroundColor: `${
                darkMode
                  ? (prediction.deal_classification === 'Bonne affaire' ? '#2e7d32' : '#c62828')
                  : (prediction.deal_classification === 'Bonne affaire' ? '#a5d6a7' : '#ef9a9a')
              } !important`
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Résultat de la Prédiction
              </Typography>
              <Typography variant="body1">
                Prix Estimé : {prediction.predicted_price} €
              </Typography>
              <Typography variant="body1">
                Classification de l&apos;offre : {prediction.deal_classification}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}

PredictionForm.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

export default PredictionForm;