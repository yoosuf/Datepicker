import type { DateFormat } from "../types/datePicker"

export const formatDate = (date: Date, format: DateFormat): string => {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()

  switch (format) {
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`
    case "yyyy/mm/dd":
      return `${year}/${month}/${day}`
  }
}

export const parseDate = (dateString: string, format: DateFormat): Date | null => {
  const [part1, part2, part3] = dateString.split("/")
  let year: number, month: number, day: number

  switch (format) {
    case "mm/dd/yyyy":
      month = Number.parseInt(part1, 10) - 1
      day = Number.parseInt(part2, 10)
      year = Number.parseInt(part3, 10)
      break
    case "dd/mm/yyyy":
      day = Number.parseInt(part1, 10)
      month = Number.parseInt(part2, 10) - 1
      year = Number.parseInt(part3, 10)
      break
    case "yyyy/mm/dd":
      year = Number.parseInt(part1, 10)
      month = Number.parseInt(part2, 10) - 1
      day = Number.parseInt(part3, 10)
      break
  }

  const date = new Date(year, month, day)
  if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
    return date
  }
  return null
}

export const validateDateFormat = (dateString: string, format: DateFormat): string | null => {
  const regex = {
    "mm/dd/yyyy": /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    "dd/mm/yyyy": /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "yyyy/mm/dd": /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
  }

  if (!regex[format].test(dateString)) {
    return `Invalid date format. Use ${format}.`
  }

  const parsedDate = parseDate(dateString, format)
  if (!parsedDate) {
    return "Invalid date. Please enter a valid date."
  }

  return null
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export const getAriaLabel = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return formatter.format(date)
}

export const formatDateInput = (value: string, format: DateFormat): string => {
  const digitsOnly = value.replace(/\D/g, "")
  let formattedValue = ""

  if (format === "mm/dd/yyyy" || format === "dd/mm/yyyy") {
    if (digitsOnly.length > 0) formattedValue += digitsOnly.substr(0, 2)
    if (digitsOnly.length > 2) formattedValue += "/" + digitsOnly.substr(2, 2)
    if (digitsOnly.length > 4) formattedValue += "/" + digitsOnly.substr(4, 4)
  } else if (format === "yyyy/mm/dd") {
    if (digitsOnly.length > 0) formattedValue += digitsOnly.substr(0, 4)
    if (digitsOnly.length > 4) formattedValue += "/" + digitsOnly.substr(4, 2)
    if (digitsOnly.length > 6) formattedValue += "/" + digitsOnly.substr(6, 2)
  }

  return formattedValue
}

