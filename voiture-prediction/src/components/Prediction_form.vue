<template>
    <div>
      <h2>Prédiction des Voitures d'Occasion</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.kilometrage" type="number" placeholder="Kilométrage" />
        <input v-model="formData.annee" type="number" placeholder="Année" />
        <input v-model="formData.marque" type="text" placeholder="Marque" />
        <input v-model="formData.carburant" type="text" placeholder="Type de Carburant" />
        <input v-model="formData.transmission" type="text" placeholder="Transmission" />
        <input v-model="formData.modele" type="text" placeholder="Modèle" />
        <input v-model="formData.etat" type="text" placeholder="État" />
        <button type="submit">Prédire le Prix</button>
      </form>
      <div v-if="prediction">
        <p>Prix estimé : {{ prediction.predicted_price }} €</p>
        <p>Classification : {{ prediction.deal_classification }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          kilometrage: 15000,
          annee: 2020,
          marque: '',
          carburant: 'Essence',
          transmission: 'Manuelle',
          modele: '208',
          etat: 'Occasion'
        },
        prediction: null
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/predict_combined`,  // Aligner avec le backend
            this.formData
          );
          this.prediction = response.data;
        } catch (error) {
          console.error("Erreur lors de la prédiction", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
    /* Ajoutez votre CSS ici */
  </style>  