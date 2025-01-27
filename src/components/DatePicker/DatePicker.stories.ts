import type { Meta, StoryObj } from "@storybook/vue3";
import DatePicker from "./DatePicker.vue";
import { ref } from "vue";

const meta = {
  title: "DatePicker/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "date", description: "Selected date value" },
    placeholder: { control: "text", description: "Input placeholder" },
    dateFormat: {
      control: { type: "select", options: ["mm/dd/yyyy", "dd/mm/yyyy", "yyyy/mm/dd"] },
      description: "Date format for display (select from dropdown)",
    },
    firstDayOfWeek: {
      control: { type: "select", options: [0, 1] },
      description: "First day of the week (0 for Sunday, 1 for Monday)",
    },
    ariaLabel: { control: "text", description: "ARIA label for accessibility" },
    ariaDescribedby: { control: "text", description: "ARIA description for accessibility" },
    disabledDates: {
      control: "object",
      description: "Array of disabled dates as `Date` objects",
    },
    label: { control: "text", description: "Label for the input field" },
    class: { control: "text", description: "Custom class for theming" },
    isRange: { control: "boolean", description: "Whether the input supports date ranges" },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const modelValue = ref(args.modelValue);
      const toggleCalendar = () => console.log("Toggled calendar");
      const validateInput = () => console.log("Validated input");

      return { args, modelValue, toggleCalendar, validateInput };
    },
    template: `
      <DatePicker 
        v-model="modelValue" 
        v-bind="args" 
        @toggle="toggleCalendar" 
        @validate="validateInput" 
      />
    `,
  }),
  args: {
    modelValue: null,
    placeholder: "Select date",
    dateFormat: "yyyy/mm/dd",
    firstDayOfWeek: 1,
    ariaLabel: "Date picker",
    ariaDescribedby: "date-picker-description",
    disabledDates: [], // No disabled dates by default
    label: "Date",
    class: "",
    isRange: false,
  },
};

export const WithPreselectedDate: Story = {
  ...Default,
  args: {
    ...Default.args,
    modelValue: new Date("2023-06-15"),
    isRange: true
  },
};

export const WithDisabledDates: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabledDates: [new Date("2023-06-15"), new Date("2023-06-20")], // Use `Date` objects
  },
};

export const DarkMode: Story = {
  ...Default,
  args: {
    ...Default.args,
    class: "dark",
  },
};

export const DateRange: Story = {
  args: {
    modelValue: null,
    placeholder: "Select date",
    dateFormat: "mm/dd/yyyy",
    firstDayOfWeek: 0,
    ariaLabel: "Date picker",
    ariaDescribedby: "date-picker-description",
    disabledDates: [],
    label: "Date",
    class: "",
    isRange: true
  },

  render: args => ({
    components: {
      DatePicker
    },

    setup() {
      const modelValue = ref(args.modelValue);
      const toggleCalendar = () => console.log("Toggled calendar");
      const validateInput = () => console.log("Validated input");

      return {
        modelValue,
        toggleCalendar,
        validateInput
      };
    },

    template: `
      <DatePicker 
        v-model="modelValue" 
        v-bind="args" 
        @toggle="toggleCalendar" 
        @validate="validateInput" 
      />
    `
  })
};
