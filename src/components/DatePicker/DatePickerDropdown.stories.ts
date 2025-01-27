import type { Meta, StoryObj } from "@storybook/vue3"
import DatePickerDropdown from "./DatePickerDropdown.vue"

const meta = {
  title: "DatePicker/DatePickerDropdown",
  component: DatePickerDropdown,
  tags: ["autodocs"],
  argTypes: {
    currentDate: { control: "date" },
    selectedDate: { control: "date" },
    firstDayOfWeek: { control: { type: "select", options: [0, 1] } },
    disabledDates: { control: "object" },
    ariaLabel: { control: "text" },
  },
} satisfies Meta<typeof DatePickerDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentDate: new Date(2023, 5, 1),
    selectedDate: new Date(2023, 5, 15),
    firstDayOfWeek: 0,
    disabledDates: [],
    ariaLabel: "Date picker dropdown",
  },
}

export const MondayFirstDay: Story = {
  args: {
    ...Default.args,
    firstDayOfWeek: 1,
  },
}

export const WithDisabledDates: Story = {
  args: {
    ...Default.args,
    disabledDates: [new Date(2023, 5, 10), new Date(2023, 5, 15), new Date(2023, 5, 20)],
  },
}

