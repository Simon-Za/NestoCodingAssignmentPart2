<template>
  <div class="dropdown-row">
    <label for="store-select">Select Store:</label>
    <select id="store-select" :value="modelValue" @change="onChange">
      <option v-for="store in stores" :key="store.id" :value="store.id">
        {{ store.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

import { defineProps, defineEmits } from 'vue';
const props = defineProps<{
  stores: any[],
  modelValue: string
}>();
const emit = defineEmits(['update:modelValue']);

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<style scoped>
.dropdown-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  gap: 12px;
}

label {
  font-weight: 500;
  color: #7b8fa1;
}

select {
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid #b2becd;
  background: #e3f2fd;
  color: #374151;
  font-size: 1rem;
  transition: border 0.2s;
}

select:focus {
  outline: none;
  border: 1.5px solid #6c63ff;
}
</style>
