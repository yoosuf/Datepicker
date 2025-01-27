import type { Meta, StoryObj } from "@storybook/vue3";
import NavigationButton from "./NavigationButton.vue";
import { ChevronLeftIcon } from "lucide-vue-next";

const meta = {
  title: "DatePicker/Atoms/NavigationButton",
  component: NavigationButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NavigationButton, ChevronLeftIcon },
    setup() {
      return { args };
    },
    template:
      '<NavigationButton v-bind="args"><ChevronLeftIcon /></NavigationButton>',
  }),
  args: {
    label: "Previous month",
  },
};
