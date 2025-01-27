<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <NavigationButton
        label="Previous month"
        @click="$emit('previous-month', $event)"
      >
        <ChevronLeftIcon class="w-5 h-5" />
      </NavigationButton>
      <h2 class="text-lg font-semibold dark:text-white" id="current-month" aria-live="polite">
        {{ currentMonthName }} {{ currentYear }}
      </h2>
      <NavigationButton
        label="Next month"
        @click="$emit('next-month', $event)"
      >
        <ChevronRightIcon class="w-5 h-5" />
      </NavigationButton>
    </div>
    <div class="grid grid-cols-7 mb-2" role="row">
      <span
        v-for="day in weekDays"
        :key="day"
        class="text-center text-sm font-medium text-gray-500 py-2 dark:text-gray-400"
        role="columnheader"
        :aria-label="getFullDayName(day)"
      >
        {{ day }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import NavigationButton from '../atoms/NavigationButton.vue'

defineProps<{
  currentMonthName: string
  currentYear: number
  weekDays: string[]
}>()

defineEmits<{
  (e: 'previous-month', event: MouseEvent): void
  (e: 'next-month', event: MouseEvent): void
}>()

const getFullDayName = (shortDay: string) => {
  const days = {
    'Su': 'Sunday',
    'Mo': 'Monday',
    'Tu': 'Tuesday',
    'We': 'Wednesday',
    'Th': 'Thursday',
    'Fr': 'Friday',
    'Sa': 'Saturday'
  };
  return days[shortDay as keyof typeof days] || shortDay;
};
</script>

