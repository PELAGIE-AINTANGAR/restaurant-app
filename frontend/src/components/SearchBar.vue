<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps({ modelValue: String, restaurants: {
    type: Array,
    default: () => []
  } });
const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');

const suggestions = ref([]);

watch(searchQuery, (val) => {
  emit('update:searchQuery', val);
  if (val && props.restaurants.length) {
    const query = val.toLowerCase();
    suggestions.value = props.restaurants.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.address.toLowerCase().includes(query)
    ).slice(0, 5); 
  } else {
    suggestions.value = [];
  }
});
</script>
<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" placeholder="Rechercher nom ou adresse..." />
    <ul v-if="suggestions.length">
      <li v-for="r in suggestions" :key="r.id">{{ r.name }} - {{ r.address }}</li>
    </ul>
  </div>
</template>
<style scoped>
ul { border: 1px solid #ccc; margin: 0; padding: 0; list-style: none; }
li { padding: 5px; cursor: pointer; }
li:hover { background: #eee; }
</style>