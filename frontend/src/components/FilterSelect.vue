<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const cuisines = [
  'Française',
  'Italienne',
  'Asiatique',
  'Américaine',
  'Méditerranéenne',
  'Autre'
];
</script>

<template>
  <div class="filter-select">
    <select
      :value="modelValue"
      @change="e => emit('update:modelValue', e.target.value)"
    >
      <option value="">Toutes</option>
      <option
        v-for="cuisine in cuisines"
        :key="cuisine"
        :value="cuisine"
      >
        {{ cuisine }}
      </option>
    </select>
  </div>
</template>