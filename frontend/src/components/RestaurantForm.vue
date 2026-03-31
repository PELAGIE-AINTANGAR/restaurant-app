<script setup>
import { ref } from 'vue';
import { createRestaurant } from '../services/restaurantService';
import FilterSelect from './FilterSelect.vue';

const emit = defineEmits(['submitForm']);

// Formulaire regroupé
const restform = ref({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    cuisine_type: '',
    phone_number: ''
});

const errors = ref({});

// Validation complète
const validateForm = () => {
  errors.value = {};

  if (!restform.value.name || restform.value.name.length < 3) {
    errors.value.name = 'Le nom doit contenir au moins 3 caractères';
  }

  if (!restform.value.address || restform.value.address.length < 10) {
    errors.value.address = 'L’adresse doit contenir au moins 10 caractères';
  }

  const lat = parseFloat(restform.value.latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    errors.value.latitude = 'La latitude doit être comprise entre -90 et 90';
  }

  const lon = parseFloat(restform.value.longitude);
  if (isNaN(lon) || lon < -180 || lon > 180) {
    errors.value.longitude = 'La longitude doit être comprise entre -180 et 180';
  }

  if (!restform.value.cuisine_type) {
    errors.value.cuisine_type = 'Veuillez sélectionner un type de cuisine';
  }

  if (restform.value.phone_number && !/^\+?\d{8,15}$/.test(restform.value.phone_number)) {
    errors.value.phone_number = 'Numéro de téléphone invalide';
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
      await createRestaurant(restform.value);
      emit('submitForm'); 
      alert('Restaurant ajouté avec succès!');

      // Reset
      restform.value = {
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        cuisine_type: '',
        phone_number: ''
      };
      errors.value = {};
  } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Erreur lors de l’ajout du restaurant. Réessayez.');
  }
};
</script>

<template>
  <div class="restaurant-form">
    <h2>Ajouter un Restaurant</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="restform.name" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="restform.address" />
        <span class="error" v-if="errors.address">{{ errors.address }}</span>
      </div>

      <div class="form-group">
        <label for="latitude">Latitude:</label>
        <input type="text" id="latitude" v-model="restform.latitude" />
        <span class="error" v-if="errors.latitude">{{ errors.latitude }}</span>
      </div>

      <div class="form-group">
        <label for="longitude">Longitude:</label>
        <input type="text" id="longitude" v-model="restform.longitude" />
        <span class="error" v-if="errors.longitude">{{ errors.longitude }}</span>
      </div>

      <div class="form-group">
        <label for="cuisine_type">Type_Cuisine:</label>
        <FilterSelect v-model="restform.cuisine_type" />
        <span class="error" v-if="errors.cuisine_type">{{ errors.cuisine_type }}</span>
      </div>

      <div class="form-group">
        <label for="phone_number">Numéro de Téléphone:</label>
        <input type="text" id="phone_number" v-model="restform.phone_number" />
        <span class="error" v-if="errors.phone_number">{{ errors.phone_number }}</span>
      </div>

      <button type="submit">Ajouter un Restaurant</button>
    </form>
  </div>
</template>

<style scoped>
.restaurant-form {
    max-width: 400px;
    margin: 0 auto;
}
.form-group {
    margin-bottom: 15px;
}
label {
    display: block;
    margin-bottom: 5px;
}
input, select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}   
button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: #38a173;
}
.error { color: red; font-size: 0.9em; }
</style>