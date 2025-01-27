export interface DateValue {
  date: Date
  dayOfMonth: number
  isCurrentMonth: boolean
}

export type DateFormat = "mm/dd/yyyy" | "dd/mm/yyyy" | "yyyy/mm/dd"

export interface DatePickerProps {
  modelValue: Date | null
  placeholder?: string
  dateFormat?: DateFormat
  firstDayOfWeek?: 0 | 1
  ariaLabel?: string
  ariaDescribedby?: string
  disabledDates: Date[]
  class?: string
  label?: string
}

export type DatePickerEmits = (e: "update:modelValue", date: Date | null) => void

