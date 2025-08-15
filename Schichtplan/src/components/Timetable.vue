<template>
  <table class="timetable">
    <tr>
      <th v-for="hour in hours" :key="hour">{{ hour }}</th>
    </tr>
    <tr v-for="employee in employees" :key="employee.id">
      <template v-for="(cell, idx) in getShiftCells(employee, shiftPlan)" :key="idx">
        <td v-if="cell.empty" :colspan="cell.colspan"></td>
        <td v-else :colspan="cell.colspan" class="shift-bar">
          {{ cell.label }}
        </td>
      </template>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Employee, Shift } from '../utils';
import { getShiftCells } from '../utils';

const props = defineProps<{
  employees: Employee[],
  shiftPlan: Shift[],
  hours: string[],
}>();
</script>

<style scoped>
th,
td {
  min-width: 40px;
}

.timetable {
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background: #f1f8e9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04);
}

th,
td {
  word-break: break-word;
}

th,
td {
  border-right: 1.5px solid #b2becd;
  border-left: 1.5px solid #b2becd;
  border-top: none;
  border-bottom: none;
  padding: 2px 8px;
  text-align: center;
  min-height: 20px;
  background: #fff;
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
