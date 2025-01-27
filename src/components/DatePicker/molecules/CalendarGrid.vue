<template>
  <div
    :class="[
      'grid grid-cols-7 gap-1',
      weeksInMonth === 4 ? 'grid-rows-4' : weeksInMonth === 5 ? 'grid-rows-5' : 'grid-rows-6'
    ]"
    role="grid"
    :aria-labelledby="'current-month'"
  >
    <CalendarDay
      v-for="(date, index) in calendarDays.slice(0, weeksInMonth * 7)"
      :key="date.date.toISOString()"
      v-bind="date"
      :is-selected="isSelectedDate(date)"
      :is-disabled="isDisabledDate(date.date)"
      :is-range="isRange"
      :selected-range="selectedRange"
      :is-today="isToday(date.date)"
      @select="$emit('select-date', $event)"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DateValue, DateRange } from '../../../types/datePicker'
import CalendarDay from '../atoms/CalendarDay.vue'
import { isToday } from '../../../utils/dateUtils'

const props = defineProps<{
  calendarDays: DateValue[]
  selectedDate: Date | null
  currentDate: Date
  disabledDates: Date[]
  isRange: boolean
  selectedRange: DateRange
}>()

const emit = defineEmits<{
  (e: 'select-date', date: DateValue): void
  (e: 'previous-month'): void
  (e: 'next-month'): void
}>()

const isSelectedDate = (dateObj: DateValue) => {
  if (!props.selectedDate) return false
  return dateObj.date.toDateString() === props.selectedDate.toDateString()
}

const isDisabledDate = (date: Date) => {
  return props.disabledDates.some(disabledDate => 
    disabledDate.toDateString() === date.toDateString()
  );
};

const handleKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement
  const currentIndex = Array.from(target.parentElement?.children || []).indexOf(target)
  let newIndex: number

  switch (event.key) {
    case 'ArrowLeft':
      newIndex = currentIndex - 1
      break
    case 'ArrowRight':
      newIndex = currentIndex + 1
      break
    case 'ArrowUp':
      newIndex = currentIndex - 7
      break
    case 'ArrowDown':
      newIndex = currentIndex + 7
      break
    case 'Home':
      newIndex = currentIndex - (currentIndex % 7)
      break
    case 'End':
      newIndex = currentIndex + (6 - (currentIndex % 7))
      break
    case 'PageUp':
      emit('previous-month')
      return
    case 'PageDown':
      emit('next-month')
      return
    default:
      return
  }

  if (newIndex >= 0 && newIndex < props.calendarDays.length) {
    const newTarget = target.parentElement?.children[newIndex] as HTMLElement
    if (newTarget && newTarget.getAttribute('tabindex') === '0') {
      newTarget.focus()
    }
  }
}

const weeksInMonth = computed(() => {
  const firstDayOfMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  return Math.ceil((daysInMonth + firstDayOfWeek) / 7);
});
</script>

