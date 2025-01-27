import { App } from 'vue'
import DatePicker from './components/DatePicker/DatePicker.vue'

export { DatePicker }
export * from './types/datePicker'
export * from './utils/dateUtils'
export * from './composables/useDatePicker'
export * from './composables/useCalendarDays'

export default {
  install: (app: App) => {
    app.component('DatePicker', DatePicker)
  }
}
