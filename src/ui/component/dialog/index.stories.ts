import type { Meta, StoryObj } from "@storybook/react";

import Dialog from ".";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Dialog> = {
  title: "Component/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: "Dialog",
  },
};
