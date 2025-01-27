import { ref, computed, watch } from "vue"
import type { DateValue, DateFormat } from "../types/datePicker"
import { formatDate, parseDate, validateDateFormat } from "../utils/dateUtils"

export function useDatePicker(
  props: {
    modelValue: Date | null
    dateFormat: DateFormat
    disabledDates: Date[]
  },
  emit: (event: "update:modelValue", value: Date | null) => void,
) {
  const currentDate = ref(new Date())
  const selectedDate = ref<Date | null>(props.modelValue instanceof Date ? props.modelValue : null)
  const isOpen = ref(false)
  const inputValue = ref(
    props.modelValue && props.modelValue instanceof Date ? formatDate(props.modelValue, props.dateFormat) : "",
  )
  const error = ref("")

  const formattedValue = computed(() => {
    return selectedDate.value instanceof Date ? formatDate(selectedDate.value, props.dateFormat) : ""
  })

  watch(selectedDate, (newDate) => {
    if (newDate && newDate instanceof Date) {
      inputValue.value = formatDate(newDate, props.dateFormat)
    } else {
      inputValue.value = ""
    }
  })

  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue && newValue instanceof Date) {
        inputValue.value = formatDate(newValue, props.dateFormat)
        selectedDate.value = newValue
      } else if (typeof newValue === "number") {
        const date = new Date(newValue)
        inputValue.value = formatDate(date, props.dateFormat)
        selectedDate.value = date
      } else {
        inputValue.value = ""
        selectedDate.value = null
      }
    },
  )

  const toggleCalendar = () => {
    isOpen.value = !isOpen.value
  }

  const closeCalendar = () => {
    isOpen.value = false
  }

  const previousMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  }

  const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  }

  const selectDate = (dateObj: DateValue) => {
    if (props.disabledDates.some((disabledDate) => disabledDate.toDateString() === dateObj.date.toDateString())) {
      return
    }
    selectedDate.value = dateObj.date
    emit("update:modelValue", dateObj.date)
    closeCalendar()
  }

  const validateInput = () => {
    const validationError = validateDateFormat(inputValue.value, props.dateFormat)
    if (validationError) {
      error.value = validationError
      emit("update:modelValue", null)
      return
    }

    const parsedDate = parseDate(inputValue.value, props.dateFormat)
    if (parsedDate) {
      error.value = ""
      selectDate({ date: parsedDate, dayOfMonth: parsedDate.getDate(), isCurrentMonth: true })
    } else {
      error.value = "Invalid date. Please enter a valid date."
      emit("update:modelValue", null)
    }
  }

  const handlePreviousMonth = (event: MouseEvent) => {
    event.stopPropagation()
    previousMonth()
  }

  const handleNextMonth = (event: MouseEvent) => {
    event.stopPropagation()
    nextMonth()
  }

  return {
    currentDate,
    selectedDate,
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
  }
}

