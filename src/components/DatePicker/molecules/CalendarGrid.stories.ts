import type { Meta, StoryObj } from "@storybook/vue3";
import CalendarGrid from "./CalendarGrid.vue";
import { useCalendarDays } from "../../../composables/useCalendarDays";

const meta = {
  title: "DatePicker/Molecules/CalendarGrid",
  component: CalendarGrid,
  tags: ["autodocs"],
  argTypes: {
    selectedDate: { control: "date" },
    currentDate: { control: "date" },
    disabledDates: { control: "object" },
  },
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    // Use the composable to compute calendarDays dynamically
    const { calendarDays } = useCalendarDays({
      currentDate: args.currentDate,
      firstDayOfWeek: 0,
      disabledDates: args.disabledDates,
    });

    return {
      components: { CalendarGrid },
      setup() {
        return { args, calendarDays }; // Pass calendarDays to the template
      },
      template: `
        <CalendarGrid 
          v-bind="args" 
          :calendar-days="calendarDays" 
        />
      `,
    };
  },
  args: {
    selectedDate: new Date(2023, 5, 15), // Example selected date
    currentDate: new Date(2023, 5, 1), // Example current date
    disabledDates: [], // Default to an empty array
  },
};

export const WithDisabledDates: Story = {
  render: (args) => {
    // Use the composable to compute calendarDays dynamically
    const { calendarDays } = useCalendarDays({
      currentDate: args.currentDate,
      firstDayOfWeek: 0,
      disabledDates: args.disabledDates,
    });

    return {
      components: { CalendarGrid },
      setup() {
        return { args, calendarDays }; // Pass calendarDays to the template
      },
      template: `
        <CalendarGrid 
          v-bind="args" 
          :calendar-days="calendarDays" 
        />
      `,
    };
  },
  args: {
    selectedDate: 1686940200000, // Example selected date
    currentDate: 1686249000000, // Example current date
    disabledDates: [
      new Date(2023, 5, 10),
      new Date(2023, 5, 15),
      new Date(2023, 5, 20),
    ], // Example disabled dates
  },
};
