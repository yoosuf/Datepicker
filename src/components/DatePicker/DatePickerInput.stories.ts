import type { Meta, StoryObj } from "@storybook/vue3"
import DatePickerInput from "./DatePickerInput.vue"
import { ref } from "vue"

const meta = {
  title: "DatePicker/DatePickerInput",
  component: DatePickerInput,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    dateFormat: { control: { type: "select", options: ["mm/dd/yyyy", "dd/mm/yyyy", "yyyy/mm/dd"] } },
    ariaLabel: { control: "text" },
    ariaDescribedby: { control: "text" },
    isOpen: { control: "boolean" },
  },
} satisfies Meta<typeof DatePickerInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { DatePickerInput },
    setup() {
      const modelValue = ref(args.modelValue)
      return { args, modelValue }
    },
    template: '<DatePickerInput v-model="modelValue" v-bind="args" />',
  }),
  args: {
    modelValue: "",
    placeholder: "Select date",
    error: "",
    dateFormat: "mm/dd/yyyy",
    ariaLabel: "Date picker input",
    ariaDescribedby: "date-picker-input-description",
    isOpen: false,
  },
}

export const WithValue: Story = {
  ...Default,
  args: {
    ...Default.args,
    modelValue: "06/15/2023",
  },
}

export const WithError: Story = {
  ...Default,
  args: {
    ...Default.args,
    error: "Invalid date format",
  },
}

