import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tooltip> = {
  title: "Component/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Good luck",
  },
};
