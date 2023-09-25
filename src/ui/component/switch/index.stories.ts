import type { Meta, StoryObj } from "@storybook/react";

import { Switchs } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Switchs> = {
  title: "Component/Switchs",
  component: Switchs,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Switchs>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "test",
  },
};
