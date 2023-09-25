import type { Meta, StoryObj } from "@storybook/react";

import TextBox from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextBox> = {
  title: "Component/TextBox",
  component: TextBox,
  tags: ["autodocs"],
  argTypes: {
    primary: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextBox>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    message: "Text",
    primary: true,
  },
};
