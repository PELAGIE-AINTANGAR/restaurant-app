<script setup>
    const props = defineProps({
    restaurant: Object
    })
</script>

<template>
  <div class="restaurant-item">
    <h3>{{ props.restaurant.name }}</h3>
    <p>{{ props.restaurant.address }}</p>
    <p>Cuisine: {{ props.restaurant.cuisine_type }}</p>
    <p>Phone: {{ props.restaurant.phone_number }}</p>
  </div>
</template>

<style scoped>
.restaurant-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>