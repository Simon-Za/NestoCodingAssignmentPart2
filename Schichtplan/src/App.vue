<script setup lang="ts">
import treeData from '@/assets/tree.json';
import { ref, computed } from 'vue';
import Timetable from './components/Timetable.vue';
import StoreSelect from './components/StoreSelect.vue';
import { findStores } from './utils';
import type { Store } from './utils';

const hours = Array.from({ length: 25 }, (_, i) => `${i % 24}:00`);

const stores: Store[] = findStores(treeData as unknown as Store);
const selectedStoreId = ref(stores[0]?.id || '');
const selectedStore = computed(() => stores.find(store => store.id === selectedStoreId.value));
</script>

<template>
  <div class="container">
    <h2 class="heading">Shift Plan</h2>
    <StoreSelect :stores="stores" v-model="selectedStoreId" />
    <Timetable :employees="selectedStore?.employees || []" :shiftPlan="selectedStore?.shiftPlan || []" :hours="hours" />
  </div>
</template>

<style scoped>
.container {
  max-width: 100vw;
  min-height: 40vw;
  margin: 32px auto;
  background: #f8fafc;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
  padding: 32px 8px 24px 8px;
  overflow-x: auto;
}

.heading {
  text-align: center;
  color: #5cb6ff;
  font-size: 2.2rem;
  margin-bottom: 24px;
  font-family: 'Segoe UI', Arial, sans-serif;
}

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

.timetable {
  border-collapse: collapse;
  width: 66%;
  margin: 0 auto;
  background: #f1f8e9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04);
}

th {
  border-right: 1.5px solid #b2becd;
  border-left: 1.5px solid #b2becd;
  border-top: none;
  border-bottom: none;
  padding: 2px 8px;
  text-align: center;
  min-height: 20px;
  background: #fff;
}

td {
  border-right: 1.5px solid #b2becd;
  border-left: 1.5px solid #b2becd;
  border-top: none;
  border-bottom: none;
  padding: 2px 4px;
  text-align: center;
  min-height: 20px;
  background: #fff;
}

.timetable tr {
  height: 22px;
}

.shift-bar {
  background: linear-gradient(90deg, #b2ebf2 0%, #f8bbd0 100%);
  color: #374151;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(108, 99, 255, 0.08);
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  line-height: 1.1;
  padding: 2px 8px;
  margin: 2px 0;
}
</style>
