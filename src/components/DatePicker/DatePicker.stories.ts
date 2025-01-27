import type { Meta, StoryObj } from "@storybook/vue3"
import DatePicker from "./DatePicker.vue"
import { ref } from "vue"

const meta = {
  title: "DatePicker/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "date" },
    placeholder: { control: "text" },
    dateFormat: {
      control: { type: "select", options: ["mm/dd/yyyy", "dd/mm/yyyy", "yyyy/mm/dd"] },
    },
    firstDayOfWeek: { control: { type: "select", options: [0, 1] } },
    ariaLabel: { control: "text" },
    ariaDescribedby: { control: "text" },
    disabledDates: { control: "object" },
    label: {
      control: "text",
      description: "Label for the date picker input field.",
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const modelValue = ref(args.modelValue)
      return { args, modelValue }
    },
    template: '<DatePicker v-model="modelValue" v-bind="args" />',
  }),
  args: {
    modelValue: 1738022400000,
    placeholder: "Select date",
    dateFormat: "mm/dd/yyyy",
    firstDayOfWeek: 0,
    ariaLabel: "Date picker",
    ariaDescribedby: "date-picker-description",
    disabledDates: [],
    label: "Date",
  },
}

export const WithPreselectedDate: Story = {
  ...Default,
  args: {
    ...Default.args,
    modelValue: new Date(2023, 5, 15),
  },
}

export const DayMonthYearFormat: Story = {
  ...Default,
  args: {
    ...Default.args,
    dateFormat: "dd/mm/yyyy",
  },
}

export const MondayFirstDay: Story = {
  ...Default,
  args: {
    ...Default.args,
    firstDayOfWeek: 1,
  },
}

export const WithDisabledDates: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabledDates: [new Date(2023, 5, 10), new Date(2023, 5, 15), new Date(2023, 5, 20)],
  },
}

export const WithCustomLabel: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "Event Date",
  },
}

export const DarkMode: Story = {
  ...Default,
  args: {
    ...Default.args,
    class: "dark",
  },
}

