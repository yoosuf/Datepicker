export type DateFormat = "mm/dd/yyyy" | "dd/mm/yyyy" | "yyyy/mm/dd"

interface ValidationRule {
  regex: RegExp
  errorMessage: string
}

const validationRules: Record<DateFormat, ValidationRule> = {
  "mm/dd/yyyy": {
    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    errorMessage: "Invalid date format. Use mm/dd/yyyy.",
  },
  "dd/mm/yyyy": {
    regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    errorMessage: "Invalid date format. Use dd/mm/yyyy.",
  },
  "yyyy/mm/dd": {
    regex: /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
    errorMessage: "Invalid date format. Use yyyy/mm/dd.",
  },
}

export function validateDateFormat(dateString: string, format: DateFormat): string | null {
  const rule = validationRules[format]
  if (!rule) {
    throw new Error(`Unsupported date format: ${format}`)
  }

  if (!rule.regex.test(dateString)) {
    return rule.errorMessage
  }

  // Additional validation for day/month combinations
  const [first, second, third] = dateString.split("/")
  let year: number, month: number, day: number

  switch (format) {
    case "mm/dd/yyyy":
      ;[month, day, year] = [Number.parseInt(first), Number.parseInt(second), Number.parseInt(third)]
      break
    case "dd/mm/yyyy":
      ;[day, month, year] = [Number.parseInt(first), Number.parseInt(second), Number.parseInt(third)]
      break
    case "yyyy/mm/dd":
      ;[year, month, day] = [Number.parseInt(first), Number.parseInt(second), Number.parseInt(third)]
      break
  }

  if (month < 1 || month > 12) {
    return "Invalid month."
  }

  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) {
    return "Invalid day for the selected month."
  }

  return null
}

export function parseDate(dateString: string, format: DateFormat): Date | null {
  const [first, second, third] = dateString.split("/")
  let year: number, month: number, day: number

  switch (format) {
    case "mm/dd/yyyy":
      ;[month, day, year] = [Number.parseInt(first), Number.parseInt(second), Number.parseInt(third)]
      break
    case "dd/mm/yyyy":
      ;[day, month, year] = [Number.parseInt(first), Number.parseInt(second), Number.parseInt(third)]
      break
    case "yyyy/mm/dd":
      ;[year, month, day] = [Number.parseInt(first), Number.parseInt(second), Number.parseInt(third)]
      break
    default:
      throw new Error(`Unsupported date format: ${format}`)
  }

  const date = new Date(year, month - 1, day)
  if (isNaN(date.getTime())) {
    return null
  }
  return date
}

export function formatDate(date: Date, format: DateFormat): string {
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
    default:
      throw new Error(`Unsupported date format: ${format}`)
  }
}

