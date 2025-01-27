<template>
  <div class="relative" :class="{ dark: isDarkMode }">
    <DatePickerInput
      v-model="inputValue"
      :placeholder="placeholder"
      :error="error"
      :ariaLabel="ariaLabel"
      :ariaDescribedby="ariaDescribedby"
      :date-format="dateFormat"
      :is-open="isOpen"
      :label="label"
      :is-range="isRange"
      @toggle="toggleCalendar"
      @validate="validateInput"
      @input="clearError"
      ref="inputRef"
    />

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DatePickerDropdown
        v-if="isOpen"
        :current-date="currentDate"
        :selected-date="selectedDate"
        :selected-range="selectedRange"
        :first-day-of-week="firstDayOfWeek"
        :disabled-dates="disabledDates"
        :is-range="isRange"
        @select-date="handleDateSelection"
        @previous-month="handlePreviousMonth"
        @next-month="handleNextMonth"
        class="absolute z-50 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80 dark:bg-gray-800 dark:border-gray-700"
        :ariaLabel="'Date picker calendar for ' + formatDateSafe(currentDate, dateFormat)"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { DateValue, DateFormat, DateRange } from "../../types/datePicker";
import { useDatePicker } from "../../composables/useDatePicker";
import { formatDate } from "../../utils/dateUtils";
import DatePickerInput from "./DatePickerInput.vue";
import DatePickerDropdown from "./DatePickerDropdown.vue";

const props = withDefaults(
  defineProps<{
    modelValue: Date | null | DateRange;
    placeholder?: string;
    dateFormat?: DateFormat;
    firstDayOfWeek?: 0 | 1;
    ariaLabel?: string;
    ariaDescribedby?: string;
    disabledDates: Date[];
    class?: string;
    label?: string;
    isRange?: boolean;
  }>(),
  {
    placeholder: "Select date",
    dateFormat: "mm/dd/yyyy",
    firstDayOfWeek: 0,
    ariaLabel: "Date picker",
    ariaDescribedby: "date-picker-description",
    disabledDates: () => [],
    label: "Date",
    isRange: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", date: Date | null | DateRange): void;
}>();

const inputRef = ref<InstanceType<typeof DatePickerInput> | null>(null);
const isDarkMode = computed(() => props.class?.includes("dark"));

const {
  currentDate,
  selectedDate,
  selectedRange,
  isOpen,
  inputValue,
  error,
  toggleCalendar,
  closeCalendar,
  selectDate,
  validateInput,
  handlePreviousMonth,
  handleNextMonth,
} = useDatePicker(props, emit);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const isNavigationButton = target.closest(".calendar-navigation-button");
  if (
    inputRef.value &&
    !inputRef.value.$el.contains(event.target as Node) &&
    !isNavigationButton
  ) {
    closeCalendar();
  }
};

const handleDateSelection = (dateObj: DateValue) => {
  selectDate(dateObj);
  clearError();
};

const formatDateSafe = (date: Date | null, format: DateFormat): string => {
  return date && date instanceof Date ? formatDate(date, format) : "";
};

const clearError = () => {
  error.value = "";
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
