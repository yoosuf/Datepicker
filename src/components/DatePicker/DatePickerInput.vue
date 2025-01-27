<template>
  <div>
    <Label :for-id="inputId" :text="label" class="text-gray-700" />
    <p v-if="error" :id="errorId" class="text-red-500 text-sm mt-1" role="alert">{{ error }}</p>

    <div class="relative">
      <input
        :id="inputId"
        type="text"
        :value="modelValue"
        @input="handleInput"
        @blur="$emit('validate')"
        @keydown="handleKeyDown"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
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
        class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none border border-gray-300 rounded-md"
        @click="$emit('toggle')"
      >
        <CalendarIcon class="w-5 h-5" />
      </button>
    </div>
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
  isRange: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'toggle'): void;
  (e: 'validate'): void;
  (e: 'input'): void;
}>();

const inputId = computed(() => `date-picker-input-${Date.now()}`);
const errorId = computed(() => `${inputId.value}-error`);
const calendarId = computed(() => `${inputId.value}-calendar`);

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let formattedValue: string;

  if (props.isRange) {
    const [start, end] = input.value.split(' - ');
    const formattedStart = formatDateInput(start, props.dateFormat);
    const formattedEnd = formatDateInput(end, props.dateFormat);
    formattedValue = formattedStart + (end ? ' - ' + formattedEnd : '');
  } else {
    formattedValue = formatDateInput(input.value, props.dateFormat);
  }
  emit('update:modelValue', formattedValue);
  emit('input');
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    emit('toggle');
  }
};
</script>

