import type { Meta, StoryObj } from "@storybook/react";

import Progress from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Progress> = {
  title: "Component/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Progress>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    progress: 60,
  },
};
