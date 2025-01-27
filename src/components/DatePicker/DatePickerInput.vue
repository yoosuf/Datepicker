<template>
  <div>
    <Label :for-id="inputId" :text="label" />
    <div class="relative">
      <input
        :id="inputId"
        type="text"
        :value="modelValue"
        @input="handleInput"
        @blur="$emit('validate')"
        @keydown="handleKeyDown"
        class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        :aria-describedby="ariaDescribedby"
        :aria-invalid="!!error"
        role="combobox"
        aria-haspopup="dialog"
        :aria-expanded="isOpen"
        :aria-controls="calendarId"
      />
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 focus:outline-none focus:text-gray-600 dark:text-gray-300 dark:focus:text-gray-100"
        @click="$emit('toggle')"
        :aria-label="isOpen ? 'Close calendar' : 'Open calendar'"
        :aria-expanded="isOpen"
        :aria-controls="calendarId"
      >
        <CalendarIcon class="w-5 h-5" />
      </button>
    </div>
    <p v-if="error" :id="errorId" class="text-red-500 text-sm mt-1 dark:text-red-400" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CalendarIcon } from 'lucide-vue-next';
import Label from './atoms/Label.vue';
import { formatDateInput } from '../../utils/dateUtils'

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  error?: string;
  dateFormat: 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'yyyy/mm/dd';
  ariaLabel: string;
  ariaDescribedby: string;
  isOpen: boolean;
  label: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'toggle'): void;
  (e: 'validate'): void;
}>();

const inputId = computed(() => `date-picker-input-${Date.now()}`);
const errorId = computed(() => `${inputId.value}-error`);
const calendarId = computed(() => `${inputId.value}-calendar`);

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formattedValue = formatDateInput(input.value, props.dateFormat);
  emit('update:modelValue', formattedValue);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    emit('toggle');
  }
};
</script>

