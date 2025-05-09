import type { Meta, StoryObj } from "@storybook/react";
import { PageHeadDetail } from "./";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof PageHeadDetail> = {
  title: "Components / Page Head Detail",
  component: PageHeadDetail,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PageHeadDetail>;

export const Default: Story = {
  render: () => <PageHeadDetail title="Detail Page" />,
};
