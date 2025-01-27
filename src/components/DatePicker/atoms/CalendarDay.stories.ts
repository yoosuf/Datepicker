import type { Meta, StoryObj } from "@storybook/vue3";
import CalendarDay from "./CalendarDay.vue";

const meta = {
  title: "DatePicker/Atoms/CalendarDay",
  component: CalendarDay,
  tags: ["autodocs"],
  argTypes: {
    date: { control: "date" },
    dayOfMonth: { control: "number" },
    isCurrentMonth: { control: "boolean" },
    isSelected: { control: "boolean" },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof CalendarDay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    dayOfMonth: 15,
    isCurrentMonth: true,
    isSelected: false,
    isDisabled: false,
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
};

export const NotCurrentMonth: Story = {
  args: {
    ...Default.args,
    isCurrentMonth: false,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};
