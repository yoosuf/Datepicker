import { computed } from "vue"
import type { DateValue } from "../types/datePicker"

interface CalendarProps {
  currentDate: Date
  firstDayOfWeek: 0 | 1
  disabledDates: Date[]
}

export function useCalendarDays(props: CalendarProps) {
  const calendarDays = computed(() => {
    const year = props.currentDate.getFullYear()
    const month = props.currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const daysInMonth = lastDayOfMonth.getDate()
    let startingDayIndex = firstDayOfMonth.getDay()

    if (props.firstDayOfWeek === 1) {
      startingDayIndex = startingDayIndex === 0 ? 6 : startingDayIndex - 1
    }

    const days: DateValue[] = []

    const previousMonth = new Date(year, month - 1)
    const daysInPreviousMonth = new Date(year, month, 0).getDate()
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        dayOfMonth: daysInPreviousMonth - i,
        isCurrentMonth: false,
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isDisabled: props.disabledDates.some((disabledDate) => disabledDate.toDateString() === date.toDateString()),
      })
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        dayOfMonth: i,
        isCurrentMonth: false,
      })
    }

    const weeksToShow = Math.ceil(days.length / 7)
    return days.slice(0, weeksToShow * 7)
  })

  return { calendarDays }
}

