<script setup>
import { ref, onMounted, watch } from 'vue';
import RestaurantList from './components/RestaurantList.vue';
import RestaurantForm from './components/RestaurantForm.vue';
import SearchBar from './components/SearchBar.vue';
import FilterSelect from './components/FilterSelect.vue';
import { getAllRestaurants, createRestaurant } from './services/restaurantService';

const searchQuery = ref('');
const cuisineFilter = ref('');
const restaurants = ref([]);
const suggestions = ref([]);

// Charger tous les restaurants
const fetchRestaurants = async () => {
  try {
    const results = await getAllRestaurants();

    restaurants.value = results;

    updateSuggestions();

  } catch (error) {
    console.error('Erreur fetchRestaurants:', error);
  }
};

const updateSuggestions = () => {
  suggestions.value = restaurants.value.filter(r => {

    const matchesSearch =
      !searchQuery.value ||
      r.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCuisine =
      !cuisineFilter.value ||
      r.cuisine_type.toLowerCase() === cuisineFilter.value.toLowerCase();

    return matchesSearch && matchesCuisine;
  });
};

// Ajouter restaurant
const submitForm = async (restaurantData) => {
  try {
    await createRestaurant(restaurantData);
    await fetchRestaurants();
  } catch (error) {
    console.error('Error adding restaurant:', error);
  }
};

watch([searchQuery, cuisineFilter], updateSuggestions);

onMounted(fetchRestaurants);
</script>
<template>
  <div>

    <div class="filters">
      <SearchBar
        v-model="searchQuery"
        :restaurants="restaurants"
      />

      <FilterSelect v-model="cuisineFilter" />

      <RestaurantList :restaurants="restaurants" />
    </div>

    <!-- Suggestions -->
    <div v-if="searchQuery || cuisineFilter" class="suggestions">
      <p v-if="suggestions.length === 0">Aucun résultat</p>

      <div
        v-for="r in suggestions"
        :key="r.id"
        class="suggestion-item"
      >
        <strong>{{ r.name }}</strong>
        - {{ r.address }}
        ({{ r.cuisine_type }})
      </div>
    </div>

    <RestaurantForm @submitForm="submitForm" />

  </div>
</template>


<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;
}
.suggestions {
  margin-top: 20px;
}
.suggestion-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>