import type { Meta, StoryObj } from "@storybook/vue3";
import DatePickerInput from "./DatePickerInput.vue";
import { ref } from "vue";

const meta = {
  title: "DatePicker/DatePickerInput",
  component: DatePickerInput,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "text", description: "The selected date value." },
    placeholder: { control: "text", description: "Placeholder for the input field." },
    error: { control: "text", description: "Error message to display." },
    dateFormat: {
      control: { type: "select", options: ["mm/dd/yyyy", "dd/mm/yyyy", "yyyy/mm/dd"] },
      description: "The format for the date input.",
    },
    ariaLabel: { control: "text", description: "ARIA label for accessibility." },
    ariaDescribedby: { control: "text", description: "ID of the element describing the input." },
    isOpen: { control: "boolean", description: "Whether the calendar is open." },
    label: { control: "text", description: "Label for the input field." },
    isRange: { control: "boolean", description: "Whether the input supports date ranges." },
  },
} satisfies Meta<typeof DatePickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { DatePickerInput },
    setup() {
      const modelValue = ref(args.modelValue);
      const isOpen = ref(args.isOpen);

      const toggleCalendar = () => {
        isOpen.value = !isOpen.value;
      };

      const validateInput = () => {
        console.log("Validate input event triggered");
      };

      return { args, modelValue, isOpen, toggleCalendar, validateInput };
    },
    template: `
      <DatePickerInput
        v-model="modelValue"
        v-bind="args"
        :isOpen="isOpen"
        @toggle="toggleCalendar"
        @validate="validateInput"
      />
    `,
  }),
  args: {
    modelValue: "",
    placeholder: "Select date",
    error: "",
    dateFormat: "mm/dd/yyyy",
    ariaLabel: "Date picker input",
    ariaDescribedby: "date-picker-input-description",
    isOpen: false,
    label: "Select a date",
    isRange: false,
  },
};

export const WithValue: Story = {
  ...Default,
  args: {
    ...Default.args,
    modelValue: "06/15/2023",
  },
};

export const WithError: Story = {
  ...Default,
  args: {
    ...Default.args,
    error: "Invalid date format",
  },
};

export const WithRange: Story = {
  ...Default,
  args: {
    ...Default.args,
    isRange: true,
    modelValue: "06/15/2023 - 06/20/2023",
  },
};

export const OpenCalendar: Story = {
  ...Default,
  args: {
    ...Default.args,
    isOpen: true,
  },
};
