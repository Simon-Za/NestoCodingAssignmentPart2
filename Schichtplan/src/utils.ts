// src/utils.ts

export interface Employee {
  id: string;
  name: string;
}

export interface Shift {
  employeeId: string;
  start: string; // e.g. '13:00'
  end: string;   // e.g. '23:00'
}

export interface Store {
  id: string;
  name: string;
  employees: Employee[];
  shiftPlan: Shift[];
  children: Store[];
}

// Recursively find all stores (leaf nodes)
export function findStores(node: Store, stores: Store[] = []): Store[] {
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => findStores(child, stores));
  } else if (node.name && node.id && node.children && node.children.length === 0) {
    stores.push(node);
  }
  return stores;
}

// Build shift bar cells for each employee
export function getShiftCells(employee: Employee, shiftPlan: Shift[]) {
  const cells = [];
  let currentHour = 0;
  const shifts = shiftPlan.filter(s => s.employeeId === employee.id);
  for (const shift of shifts) {
    const [startH] = shift.start.split(':').map(Number);
    const [endH] = shift.end.split(':').map(Number);
    if (startH > currentHour) {
      cells.push({ empty: true, colspan: startH - currentHour });
    }
    cells.push({ empty: false, colspan: endH - startH, label: employee.name});
    currentHour = endH;
  }
  if (currentHour < 24) {
    cells.push({ empty: true, colspan: 24 - currentHour });
  }
  // Add one more cell for the extra 00:00 column
  cells.push({ empty: true, colspan: 1 });
  return cells;
}
