import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Testing } from "./testing";

const meta = {
  title: "Atoms/Testing",
  component: Testing,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Testing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: "Sample Text",
  },
};
