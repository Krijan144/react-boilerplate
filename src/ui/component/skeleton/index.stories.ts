import type { Meta, StoryObj } from "@storybook/react";

import Skeleton from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Skeleton> = {
  title: "Component/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    count: 1,
  },
};
