import type { Preview } from "@storybook/vue3";
import './../src/style.css';

const preview: Preview = {
  parameters: {
    tags: ["autodocs"], // ✅ Ensure autodocs is enabled
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
