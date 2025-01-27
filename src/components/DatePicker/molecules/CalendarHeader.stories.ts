import type { Meta, StoryObj } from "@storybook/vue3";
import CalendarHeader from "./CalendarHeader.vue";

const meta = {
  title: "DatePicker/Molecules/CalendarHeader",
  component: CalendarHeader,
  tags: ["autodocs"],
  argTypes: {
    currentMonthName: { control: { type: "text" } }, // Specify control as an object for text
    currentYear: { control: { type: "number" } },   // Specify control as an object for number
    weekDays: { control: { type: "object" } },       // Specify control as an object for arrays
  },
} satisfies Meta<typeof CalendarHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentMonthName: "June",
    currentYear: 2023,
    weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
};

export const MondayFirst: Story = {
  args: {
    ...Default.args,
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  },
};
