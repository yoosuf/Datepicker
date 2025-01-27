<template>
  <div
    @click="!isDisabled && $emit('select', { date, dayOfMonth, isCurrentMonth })"
    @keydown="handleKeyDown"
    :class="[
      'h-10 w-10 relative flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg',
      isCurrentMonth ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-400',
      isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
      isInRange ? 'bg-blue-100' : '',
      isRangeStart ? 'rounded-l-lg' : '',
      isRangeEnd ? 'rounded-r-lg' : '',
      isDisabled ? 'cursor-not-allowed text-gray-300 hover:bg-transparent' : 'cursor-pointer',
    ]"
    :tabindex="isCurrentMonth && !isDisabled ? 0 : -1"
    :aria-label="getAriaLabel(date)"
    :aria-selected="isSelected"
    :aria-disabled="isDisabled"
    role="gridcell"
  >
    {{ dayOfMonth }}
    <div
      v-if="isToday"
      class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getAriaLabel } from '../../../utils/dateUtils'

const props = defineProps<{
  date: Date
  dayOfMonth: number
  isCurrentMonth: boolean
  isSelected: boolean
  isDisabled: boolean
  isRange: boolean
  selectedRange: { start: Date | null; end: Date | null }
  isToday: boolean
}>()

const emit = defineEmits<{
  (e: 'select', date: { date: Date; dayOfMonth: number; isCurrentMonth: boolean }): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

const isInRange = computed(() => {
  if (!props.isRange || !props.selectedRange.start || !props.selectedRange.end) return false;
  return props.date > props.selectedRange.start && props.date < props.selectedRange.end;
});

const isRangeStart = computed(() => {
  if (!props.isRange || !props.selectedRange.start) return false;
  return props.date.getTime() === props.selectedRange.start.getTime();
});

const isRangeEnd = computed(() => {
  if (!props.isRange || !props.selectedRange.end) return false;
  return props.date.getTime() === props.selectedRange.end.getTime();
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!props.isDisabled) {
      emit('select', { date: props.date, dayOfMonth: props.dayOfMonth, isCurrentMonth: props.isCurrentMonth })
    }
  } else {
    emit('keydown', event)
  }
}
</script>

