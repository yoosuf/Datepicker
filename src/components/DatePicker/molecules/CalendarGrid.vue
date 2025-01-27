<template>
  <div
    class="grid grid-cols-7 gap-1"
    role="grid"
    :aria-labelledby="'current-month'"
  >
    <CalendarDay
      v-for="date in calendarDays"
      :key="date.date.toISOString()"
      v-bind="date"
      :is-selected="isSelectedDate(date)"
      :is-disabled="isDisabledDate(date.date)"
      @select="$emit('select-date', $event)"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DateValue } from '../../../types/datePicker';
import CalendarDay from '../atoms/CalendarDay.vue';

const props = defineProps<{
  calendarDays: DateValue[];
  selectedDate: Date | null;
  currentDate: Date;
  disabledDates: Date[];
}>();

const emit = defineEmits<{
  (e: 'select-date', date: DateValue): void;
  (e: 'previous-month'): void;
  (e: 'next-month'): void;
}>();

const isSelectedDate = (dateObj: DateValue) => {
  if (!props.selectedDate || !(props.selectedDate instanceof Date)) return false;
  return dateObj.date.toDateString() === props.selectedDate.toDateString();
};

const isDisabledDate = (date: Date) => {
  return props.disabledDates.some(
    (disabledDate) =>
      disabledDate instanceof Date &&
      disabledDate.toDateString() === date.toDateString()
  );
};

const handleKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  const currentIndex = Array.from(target.parentElement?.children || []).indexOf(
    target
  );
  let newIndex: number;

  switch (event.key) {
    case 'ArrowLeft':
      newIndex = currentIndex - 1;
      break;
    case 'ArrowRight':
      newIndex = currentIndex + 1;
      break;
    case 'ArrowUp':
      newIndex = currentIndex - 7;
      break;
    case 'ArrowDown':
      newIndex = currentIndex + 7;
      break;
    case 'Home':
      newIndex = currentIndex - (currentIndex % 7);
      break;
    case 'End':
      newIndex = currentIndex + (6 - (currentIndex % 7));
      break;
    case 'PageUp':
      emit('previous-month');
      return;
    case 'PageDown':
      emit('next-month');
      return;
    default:
      return;
  }

  if (newIndex >= 0 && newIndex < props.calendarDays.length) {
    const newTarget = target.parentElement?.children[newIndex] as HTMLElement;
    if (newTarget && newTarget.getAttribute('tabindex') === '0') {
      newTarget.focus();
    }
  }
};
</script>
