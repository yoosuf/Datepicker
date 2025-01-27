<template>
  <div class="bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-8">DATEPICK</h1>
      <DatePicker
        v-model="selectedDate"
        placeholder="Select date"
        dateFormat="dd/mm/yyyy"
        :firstDayOfWeek="1"
        aria-label="Select a date"
        aria-describedby="date-picker-description"
      />
      <p id="date-picker-description" class="sr-only">
        Use the date picker to select a date. You can navigate through the calendar using arrow keys, and select a date using the Enter key.
      </p>
      <p class="mt-4 text-center text-gray-600" v-if="selectedDate">
        Selected date: {{ formattedDate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DatePicker from './components/DatePicker/DatePicker.vue'

const selectedDate = ref<Date | null>(null)

const formattedDate = computed(() => {
  if (!selectedDate.value) return ''
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate.value)
})
</script>

