import { ref, computed, watch } from "vue";
import type { DateValue, DateFormat, DateRange } from "../types/datePicker";
import { formatDate, parseDate, validateDateFormat } from "../utils/dateUtils";

export function useDatePicker(
  props: {
    modelValue: Date | null | DateRange;
    dateFormat: DateFormat;
    disabledDates: Date[];
    isRange: boolean;
  },
  emit: (event: "update:modelValue", value: Date | null | DateRange) => void
) {
  const currentDate = ref(new Date());
  const selectedDate = ref<Date | null>(
    props.isRange
      ? null
      : props.modelValue instanceof Date
      ? props.modelValue
      : null
  );
  const selectedRange = ref<DateRange>(
    props.isRange && isDateRange(props.modelValue)
      ? props.modelValue
      : { start: null, end: null }
  );

  const isOpen = ref(false);
  const inputValue = ref(
    props.isRange
      ? formatDateRange(selectedRange.value, props.dateFormat)
      : props.modelValue instanceof Date
      ? formatDate(props.modelValue, props.dateFormat)
      : ""
  );
  const error = ref("");

  const formattedValue = computed(() => {
    if (props.isRange) {
      return formatDateRange(selectedRange.value, props.dateFormat);
    }
    return selectedDate.value instanceof Date
      ? formatDate(selectedDate.value, props.dateFormat)
      : "";
  });

  watch([selectedDate, selectedRange], () => {
    if (props.isRange) {
      inputValue.value = formatDateRange(selectedRange.value, props.dateFormat);
    } else if (selectedDate.value instanceof Date) {
      inputValue.value = formatDate(selectedDate.value, props.dateFormat);
    } else {
      inputValue.value = "";
    }
  });

  watch(
    () => props.modelValue,
    (newValue) => {
      if (props.isRange && isDateRange(newValue)) {
        selectedRange.value = newValue;
        inputValue.value = formatDateRange(selectedRange.value, props.dateFormat);
      } else if (newValue instanceof Date) {
        selectedDate.value = newValue;
        inputValue.value = formatDate(newValue, props.dateFormat);
      } else {
        inputValue.value = "";
        selectedDate.value = null;
        selectedRange.value = { start: null, end: null };
      }
    }
  );

  const toggleCalendar = () => {
    isOpen.value = !isOpen.value;
  };

  const closeCalendar = () => {
    isOpen.value = false;
  };

  const previousMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  };

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  };

  const selectDate = (dateObj: DateValue) => {
    if (isDateDisabled(dateObj.date)) {
      return;
    }

    if (props.isRange) {
      if (!selectedRange.value.start || selectedRange.value.end) {
        selectedRange.value = { start: dateObj.date, end: null };
      } else {
        if (dateObj.date < selectedRange.value.start) {
          selectedRange.value = {
            start: dateObj.date,
            end: selectedRange.value.start,
          };
        } else {
          selectedRange.value = {
            start: selectedRange.value.start,
            end: dateObj.date,
          };
        }
        emit("update:modelValue", selectedRange.value);
        closeCalendar();
      }
    } else {
      selectedDate.value = dateObj.date;
      emit("update:modelValue", dateObj.date);
      closeCalendar();
    }
  };

  const validateInput = () => {
    if (inputValue.value.trim() === "") {
      error.value = "";
      emit("update:modelValue", props.isRange ? { start: null, end: null } : null);
      return;
    }

    if (props.isRange) {
      if (!inputValue.value.includes(" - ")) {
        error.value = "Invalid date range format";
        emit("update:modelValue", { start: null, end: null });
        return;
      }

      const [startStr, endStr] = inputValue.value.split(" - ");
      const startError = validateDateFormat(startStr, props.dateFormat);
      const endError = validateDateFormat(endStr, props.dateFormat);

      if (startError || endError) {
        error.value = "Invalid date range format";
        emit("update:modelValue", { start: null, end: null });
        return;
      }

      const start = parseDate(startStr, props.dateFormat);
      const end = parseDate(endStr, props.dateFormat);

      if (start && end) {
        if (start > end) {
          error.value = "Start date must be before end date";
        } else {
          error.value = "";
          selectedRange.value = { start, end };
          emit("update:modelValue", selectedRange.value);
        }
      } else {
        error.value = "Invalid date range";
        emit("update:modelValue", { start: null, end: null });
      }
    } else {
      const validationError = validateDateFormat(inputValue.value, props.dateFormat);
      if (validationError) {
        error.value = validationError;
        emit("update:modelValue", null);
        return;
      }

      const parsedDate = parseDate(inputValue.value, props.dateFormat);
      if (parsedDate) {
        error.value = "";
        selectDate({
          date: parsedDate,
          dayOfMonth: parsedDate.getDate(),
          isCurrentMonth: true,
        });
      } else {
        error.value = "Invalid date. Please enter a valid date.";
        emit("update:modelValue", null);
      }
    }
  };

  const handlePreviousMonth = (event: MouseEvent) => {
    event.stopPropagation();
    previousMonth();
  };

  const handleNextMonth = (event: MouseEvent) => {
    event.stopPropagation();
    nextMonth();
  };

  const isDateDisabled = (date: Date) =>
    props.disabledDates.some(
      (disabledDate) => disabledDate.toDateString() === date.toDateString()
    );

  return {
    currentDate,
    selectedDate,
    selectedRange,
    isOpen,
    inputValue,
    error,
    formattedValue,
    toggleCalendar,
    closeCalendar,
    previousMonth,
    nextMonth,
    selectDate,
    validateInput,
    handlePreviousMonth,
    handleNextMonth,
  };
}

function formatDateRange(range: DateRange, format: DateFormat): string {
  if (range.start && range.end) {
    return `${formatDate(range.start, format)} - ${formatDate(range.end, format)}`;
  } else if (range.start) {
    return `${formatDate(range.start, format)} - `;
  }
  return "";
}

function isDateRange(value: any): value is DateRange {
  return value && typeof value === "object" && "start" in value && "end" in value;
}
