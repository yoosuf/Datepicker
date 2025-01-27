<template>
  <div
    class="bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80 dark:bg-gray-800 dark:border-gray-700"
    role="dialog"
    :aria-label="ariaLabel"
    :id="calendarId"
  >
    <CalendarHeader
      :current-month-name="currentMonthName"
      :current-year="currentYear"
      :week-days="weekDays"
      @previous-month="$emit('previous-month', $event)"
      @next-month="$emit('next-month', $event)"
    />

    <CalendarGrid
      :calendar-days="calendarDays"
      :selected-date="selectedDate"
      :current-date="currentDate"
      :disabled-dates="disabledDates"
      @select-date="$emit('select-date', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DateValue } from '../../types/datePicker'
import { useCalendarDays } from '../../composables/useCalendarDays'
import CalendarHeader from './molecules/CalendarHeader.vue'
import CalendarGrid from './molecules/CalendarGrid.vue'

const props = defineProps<{
  currentDate: Date
  selectedDate: Date | null
  firstDayOfWeek: 0 | 1
  disabledDates: Date[]
  ariaLabel: string
}>()

const emit = defineEmits<{
  (e: 'select-date', date: DateValue): void
  (e: 'previous-month', event: MouseEvent): void
  (e: 'next-month', event: MouseEvent): void
}>()

const weekDays = computed(() => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return props.firstDayOfWeek === 1 ? [...days.slice(1), days[0]] : days;
})

const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(props.currentDate)
})

const currentYear = computed(() => props.currentDate.getFullYear())

const { calendarDays } = useCalendarDays(props)

const calendarId = computed(() => `date-picker-calendar-${Date.now()}`);
</script>

