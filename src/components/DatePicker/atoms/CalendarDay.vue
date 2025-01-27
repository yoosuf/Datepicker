<template>
  <div
    @click="!isDisabled && $emit('select', { date, dayOfMonth, isCurrentMonth })"
    @keydown="handleKeyDown"
    :class="[
      'h-10 w-10 rounded-xl flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
      isCurrentMonth
        ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
        : 'text-gray-400 dark:text-gray-500',
      isSelected
        ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
        : '',
      isToday(date) ? 'border border-blue-500 dark:border-blue-400' : '',
      isDisabled
        ? 'cursor-not-allowed text-gray-300 dark:text-gray-600 hover:bg-transparent'
        : 'cursor-pointer',
    ]"
    :tabindex="isCurrentMonth && !isDisabled ? 0 : -1"
    :aria-label="getAriaLabel(date)"
    :aria-selected="isSelected"
    :aria-disabled="isDisabled"
    role="gridcell"
  >
    {{ dayOfMonth }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isToday, getAriaLabel } from "../../../utils/dateUtils";
import type { DateValue } from "../../../types/datePicker";

const props = defineProps<{
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}>();

const emit = defineEmits<{
  (e: "select", date: DateValue): void;
  (e: "keydown", event: KeyboardEvent): void;
}>();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!props.isDisabled) {
      emit("select", {
        date: props.date,
        dayOfMonth: props.dayOfMonth,
        isCurrentMonth: props.isCurrentMonth,
      });
    }
  } else {
    emit("keydown", event);
  }
};
</script>
