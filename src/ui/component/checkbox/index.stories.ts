import type { Meta, StoryObj } from "@storybook/react";

import { CheckBox } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CheckBox> = {
  title: "Component/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "CheckBox",
  },
};
