<script setup>
import {ref} from 'vue';
import RestaurantItem from './RestaurantItem.vue';
defineProps({
  restaurants: {
    type: Array,
    default: () => [] 
  }
});

const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};
const closeModal = () => {
    showModal.value = false;
    };
    

</script>
<template>
    <div>
        <button @click="openModal">Voir la liste des restaurants</button>

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <h2>Liste des Restaurants</h2>
                <button class="close-btn" @click="closeModal">&times;</button>
                <div v-if="restaurants.length > 0" class="restaurant-list">
                <RestaurantItem
                    v-for="restaurant in restaurants"
                    :key="restaurant.id"
                    :restaurant="restaurant"
                />
                </div>
                <p v-else>No restaurants found.</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.restaurant-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}
</style>